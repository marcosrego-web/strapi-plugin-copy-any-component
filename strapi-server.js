"use strict";

const contentApiRoutes = [
  {
    method: "GET",
    path: "/hello",
    handler: "controller.hello",
    config: {
      policies: [],
    },
  },
  {
    method: "GET",
    path: "/greet/:name",
    handler: "controller.greet",
    config: {
      policies: [],
    },
  },
  {
    method: "GET",
    path: "/pages/:pageId/sections",
    handler: "controller.getPageSections",
    config: {
      policies: [],
    },
  },
  {
    method: "POST",
    path: "/pages/:sourcePageId/copy-to/:targetPageId",
    handler: "controller.copySections",
    config: {
      policies: [],
    },
  },
  {
    method: "POST",
    path: "/pages/:sourcePageId/move-to/:targetPageId",
    handler: "controller.moveSections",
    config: {
      policies: [],
    },
  },
];

const componentCopyService = require("./server/src/services/component-copy");

// Helper: Content type'dan display field'ı bul
const getDisplayField = (page) => {
  const possibleFields = ['title', 'name', 'heading', 'label', 'displayName', 'slug'];
  for (const field of possibleFields) {
    if (page && page[field]) return page[field];
  }
  return page ? `ID: ${page.id}` : 'Unknown';
};

const controller = ({ strapi }) => ({
  async hello(ctx) {
    ctx.body = {
      message: "Hello from my plugin! 👋",
      timestamp: new Date().toISOString(),
      plugin: "copy-any-component",
    };
  },

  async greet(ctx) {
    const { name } = ctx.params;
    ctx.body = {
      message: `Merhaba, ${name}! 🎉`,
      timestamp: new Date().toISOString(),
    };
  },

  // 🔍 Tüm content type'ları ve dynamic zone'larını listele
  async getContentTypes(ctx) {
    try {
      const contentTypes = [];
      
      // Strapi content type registry'sini tara
      for (const [uid, contentType] of Object.entries(strapi.contentTypes)) {
        // Sadece api:: ile başlayan content type'ları al (custom content types)
        if (!uid.startsWith('api::')) continue;
        
        const dynamicZones = [];
        const attributes = contentType.attributes || {};
        
        // Dynamic zone attribute'larını bul
        for (const [attrName, attrConfig] of Object.entries(attributes)) {
          if (attrConfig.type === 'dynamiczone') {
            dynamicZones.push({
              name: attrName,
              components: attrConfig.components || [],
            });
          }
        }
        
        // Sadece dynamic zone içeren content type'ları ekle
        if (dynamicZones.length > 0) {
          contentTypes.push({
            uid,
            kind: contentType.kind, // 'collectionType' veya 'singleType'
            displayName: contentType.info?.displayName || uid,
            singularName: contentType.info?.singularName || uid,
            pluralName: contentType.info?.pluralName || uid,
            dynamicZones,
          });
        }
      }
      
      // Önce Strapi Store'dan kaydedilmiş ayarları oku
      const pluginStore = strapi.store({
        environment: '',
        type: 'plugin',
        name: 'copy-any-component',
      });
      
      const savedSettings = await pluginStore.get({ key: 'settings' });
      
      // Config dosyasından varsayılanları al
      const pluginConfig = strapi.config.get('plugin::copy-any-component') || {};
      
      // Öncelik: 1. Store'dan kaydedilmiş, 2. Config dosyasından, 3. Varsayılan
      const currentConfig = {
        contentType: savedSettings?.contentType || pluginConfig.contentType || 'api::page.page',
        dynamicZoneField: savedSettings?.dynamicZoneField || pluginConfig.dynamicZoneField || 'sections',
        savedInStore: !!savedSettings, // Kullanıcıya bilgi vermek için
      };
      
      ctx.body = {
        data: {
          contentTypes,
          currentConfig,
        },
      };
    } catch (error) {
      strapi.log.error("Error getting content types:", error);
      ctx.status = 500;
      ctx.body = { error: error.message };
    }
  },

  // 🔧 Yapılandırmayı güncelle (kalıcı olarak Strapi Store'a kaydet)
  async updateConfig(ctx) {
    try {
      const { contentType, dynamicZoneField } = ctx.request.body;
      
      if (!contentType || !dynamicZoneField) {
        ctx.status = 400;
        ctx.body = { error: 'contentType and dynamicZoneField are required' };
        return;
      }
      
      // Content type'ın var olduğunu doğrula
      if (!strapi.contentTypes[contentType]) {
        ctx.status = 400;
        ctx.body = { error: `Content type "${contentType}" not found` };
        return;
      }
      
      // Dynamic zone field'ın var olduğunu doğrula
      const attributes = strapi.contentTypes[contentType].attributes || {};
      if (!attributes[dynamicZoneField] || attributes[dynamicZoneField].type !== 'dynamiczone') {
        ctx.status = 400;
        ctx.body = { error: `Dynamic zone field "${dynamicZoneField}" not found in ${contentType}` };
        return;
      }
      
      // Strapi Store API kullanarak kalıcı kaydet (veritabanına)
      const pluginStore = strapi.store({
        environment: '',
        type: 'plugin',
        name: 'copy-any-component',
      });
      
      await pluginStore.set({
        key: 'settings',
        value: {
          contentType,
          dynamicZoneField,
        },
      });
      
      // Runtime config'i de güncelle
      strapi.config.set('plugin::copy-any-component.contentType', contentType);
      strapi.config.set('plugin::copy-any-component.dynamicZoneField', dynamicZoneField);
      
      strapi.log.info(`[CopyAnyComponent] Config saved: ${contentType} / ${dynamicZoneField}`);
      
      ctx.body = {
        data: {
          message: 'Yapılandırma başarıyla kaydedildi!',
          contentType,
          dynamicZoneField,
          note: 'Bu ayar kalıcı olarak kaydedildi. Strapi yeniden başlatıldığında da geçerli olacak.',
        },
      };
    } catch (error) {
      strapi.log.error("Error updating config:", error);
      ctx.status = 500;
      ctx.body = { error: error.message };
    }
  },

  async getPages(ctx) {
    try {
      const pluginConfig = strapi.config.get('plugin::copy-any-component') || {};
      const contentType = pluginConfig.contentType || 'api::page.page';
      const dynamicZoneField = pluginConfig.dynamicZoneField || 'sections';
      
      const pages = await strapi.entityService.findMany(contentType, {
        populate: [dynamicZoneField],
      });
      const formattedPages = pages.map((page) => ({
        ...page,
        documentId: page.documentId || page.id,
      }));
      ctx.body = { data: formattedPages };
    } catch (error) {
      ctx.status = 500;
      ctx.body = { error: error.message };
    }
  },

  async getPageSections(ctx) {
    let { pageId } = ctx.params;
    pageId = decodeURIComponent(pageId);
    
    const pluginConfig = strapi.config.get('plugin::copy-any-component') || {};
    const contentType = pluginConfig.contentType || 'api::page.page';
    const dynamicZoneField = pluginConfig.dynamicZoneField || 'sections';
    
    let page;
    const numericId = parseInt(pageId);
    if (!isNaN(numericId)) {
      try {
        page = await strapi.entityService.findOne(contentType, numericId, {
          populate: [dynamicZoneField],
        });
      } catch (error) {
        // Try with documentId
      }
    }
    
    if (!page) {
      try {
        const pages = await strapi.entityService.findMany(contentType, {
          filters: { documentId: pageId },
          populate: [dynamicZoneField],
        });
        page = pages[0];
      } catch (err) {
        ctx.status = 404;
        ctx.body = { error: "Page not found: " + pageId, data: null };
        return;
      }
    }
    
    if (!page) {
      ctx.status = 404;
      ctx.body = { error: "Page not found: " + pageId, data: null };
      return;
    }
    
    ctx.body = {
      error: null,
      data: {
        pageId: page.id,
        documentId: page.documentId,
        pageTitle: getDisplayField(page),
        sections: page[dynamicZoneField] || [],
      },
    };
  },

  async copySections(ctx) {
    let { sourcePageId, targetPageId } = ctx.params;
    const { sectionIndices, insertIndex } = ctx.request.body || {};
    
    strapi.log.info(`[CopySections] Request: sourcePageId=${sourcePageId}, targetPageId=${targetPageId}, sectionIndices=${JSON.stringify(sectionIndices)}, insertIndex=${insertIndex}`);
    
    // Input validation
    if (!sourcePageId || !targetPageId) {
      ctx.status = 400;
      ctx.body = { error: "Source and target page IDs are required", data: null };
      return;
    }

    // Validate sectionIndices if provided
    if (sectionIndices !== undefined && sectionIndices !== null) {
      if (!Array.isArray(sectionIndices)) {
        ctx.status = 400;
        ctx.body = { error: `sectionIndices must be an array, got: ${typeof sectionIndices}`, data: null };
        return;
      }
      const invalidIdx = sectionIndices.find(idx => typeof idx !== 'number' || idx < 0 || !Number.isInteger(idx));
      if (invalidIdx !== undefined) {
        ctx.status = 400;
        ctx.body = { error: `sectionIndices contains invalid value: ${invalidIdx} (type: ${typeof invalidIdx})`, data: null };
        return;
      }
    }
    
    sourcePageId = decodeURIComponent(sourcePageId);
    targetPageId = decodeURIComponent(targetPageId);
    
    const pluginConfig = strapi.config.get('plugin::copy-any-component') || {};
    const contentType = pluginConfig.contentType || 'api::page.page';
    const dynamicZoneField = pluginConfig.dynamicZoneField || 'sections';
    
    const findPage = async (id) => {
      const numericId = parseInt(id);
      if (!isNaN(numericId)) {
        try {
          return await strapi.entityService.findOne(contentType, numericId, {
            populate: [dynamicZoneField],
          });
        } catch (error) {
          // Try with documentId
        }
      }
      
      try {
        const pages = await strapi.entityService.findMany(contentType, {
          filters: { documentId: id },
          populate: [dynamicZoneField],
        });
        return pages[0];
      } catch (err) {
        return null;
      }
    };
    
    const sourcePage = await findPage(sourcePageId);
    const targetPage = await findPage(targetPageId);
    
    if (!sourcePage) {
      ctx.status = 404;
      ctx.body = { error: "Source page not found: " + sourcePageId, data: null };
      return;
    }
    
    if (!targetPage) {
      ctx.status = 404;
      ctx.body = { error: "Target page not found: " + targetPageId, data: null };
      return;
    }
    
    try {
      const service = strapi.plugin("copy-any-component").service("component-copy");
      
      if (!service) {
        ctx.status = 500;
        ctx.body = { error: "Service not found", data: null };
        return;
      }
      
      const result = await service.copySectionsToPage(
        sourcePage.id,
        targetPage.id,
        sectionIndices,
        insertIndex
      );

      strapi.log.info(`[CopySections] Service result: ${JSON.stringify(result?.error || 'success')}`);

      if (result && result.error) {
        strapi.log.error(`[CopySections] Service error: ${result.error}`);
        ctx.status = 400;
        ctx.body = result;
      } else if (result) {
        ctx.body = result;
      } else {
        ctx.status = 500;
        ctx.body = { error: "Service returned null", data: null };
      }
    } catch (error) {
      ctx.status = 500;
      ctx.body = { error: error.message || "An error occurred", data: null };
    }
  },

  async moveSections(ctx) {
    const { sourcePageId, targetPageId } = ctx.params;
    const { sectionIndices } = ctx.request.body || {};
    
    const service = strapi.plugin("my-simple-plugin").service("component-copy");
    const result = await service.moveSectionsToPage(
      parseInt(sourcePageId),
      parseInt(targetPageId),
      sectionIndices
    );

    if (result.error) {
      ctx.status = 400;
      ctx.body = result;
    } else {
      ctx.body = result;
    }
  },

  async updatePageSections(ctx) {
    let { pageId } = ctx.params;
    const { sections } = ctx.request.body || {};
    
    // Input validation
    if (!pageId) {
      ctx.status = 400;
      ctx.body = { error: "Page ID is required", data: null };
      return;
    }

    if (!sections || !Array.isArray(sections)) {
      ctx.status = 400;
      ctx.body = { error: "Sections array is required", data: null };
      return;
    }

    // Validate sections structure
    for (let i = 0; i < sections.length; i++) {
      const section = sections[i];
      if (!section || typeof section !== 'object') {
        ctx.status = 400;
        ctx.body = { error: `Section at index ${i} must be an object`, data: null };
        return;
      }
      if (!section.__component) {
        ctx.status = 400;
        ctx.body = { error: `Section at index ${i} must have a __component property`, data: null };
        return;
      }
    }
    
    pageId = decodeURIComponent(pageId);
    
    const pluginConfig = strapi.config.get('plugin::copy-any-component') || {};
    const contentType = pluginConfig.contentType || 'api::page.page';
    const dynamicZoneField = pluginConfig.dynamicZoneField || 'sections';
    
    const findPage = async (id) => {
      const numericId = parseInt(id);
      if (!isNaN(numericId)) {
        try {
          return await strapi.entityService.findOne(contentType, numericId, {
            populate: [dynamicZoneField],
          });
        } catch (error) {
          // Try with documentId
        }
      }
      
      try {
        const pages = await strapi.entityService.findMany(contentType, {
          filters: { documentId: id },
          populate: [dynamicZoneField],
        });
        return pages[0];
      } catch (err) {
        return null;
      }
    };
    
    const page = await findPage(pageId);
    
    if (!page) {
      ctx.status = 404;
      ctx.body = { error: "Page not found: " + pageId, data: null };
      return;
    }

    try {
      const updatedPage = await strapi.entityService.update(contentType, page.id, {
        data: {
          [dynamicZoneField]: sections,
        },
      });

      ctx.body = {
        error: null,
        data: {
          pageId: updatedPage.id,
          pageTitle: getDisplayField(updatedPage),
          sectionsCount: sections.length,
        },
      };
    } catch (error) {
      ctx.status = 500;
      ctx.body = { error: error.message || "An error occurred", data: null };
    }
  },

  async publishPage(ctx) {
    let { pageId } = ctx.params;
    pageId = decodeURIComponent(pageId);
    
    const pluginConfig = strapi.config.get('plugin::copy-any-component') || {};
    const contentType = pluginConfig.contentType || 'api::page.page';
    
    const findPage = async (id) => {
      const numericId = parseInt(id);
      if (!isNaN(numericId)) {
        try {
          return await strapi.entityService.findOne(contentType, numericId);
        } catch (error) {
          // Try with documentId
        }
      }
      
      try {
        const pages = await strapi.entityService.findMany(contentType, {
          filters: { documentId: id },
        });
        return pages[0];
      } catch (err) {
        return null;
      }
    };
    
    const page = await findPage(pageId);
    
    if (!page) {
      ctx.status = 404;
      ctx.body = { error: "Page not found: " + pageId, data: null };
      return;
    }

    try {
      // Strapi 5'te documentService kullanılıyor
      const documentService = strapi.documents(contentType);
      const publishedPage = await documentService.publish(page.documentId || page.id);

      ctx.body = {
        error: null,
        data: {
          pageId: publishedPage.id,
          documentId: publishedPage.documentId,
          pageTitle: publishedPage.title,
          publishedAt: publishedPage.publishedAt,
        },
      };
    } catch (error) {
      strapi.log.error("Publish error:", error);
      ctx.status = 500;
      ctx.body = { error: error.message || "An error occurred while publishing", data: null };
    }
  },
});

module.exports = {
  register({ strapi }) {
    strapi.log.info("📦 Copy Any Component Plugin registered!");
  },
  async bootstrap({ strapi }) {
    strapi.log.info("🚀 Copy Any Component Plugin bootstrapped!");
    
    // Strapi Store'dan kaydedilmiş ayarları oku ve runtime config'e uygula
    try {
      const pluginStore = strapi.store({
        environment: '',
        type: 'plugin',
        name: 'copy-any-component',
      });
      
      const savedSettings = await pluginStore.get({ key: 'settings' });
      
      if (savedSettings) {
        strapi.config.set('plugin::copy-any-component.contentType', savedSettings.contentType);
        strapi.config.set('plugin::copy-any-component.dynamicZoneField', savedSettings.dynamicZoneField);
        strapi.log.info(`[CopyAnyComponent] Loaded saved config: ${savedSettings.contentType} / ${savedSettings.dynamicZoneField}`);
      }
    } catch (error) {
      strapi.log.warn("[CopyAnyComponent] Could not load saved settings:", error.message);
    }
    
    const actions = [
      {
        section: "plugins",
        displayName: "Access Component Copy pages",
        uid: "pages.read",
        pluginName: "copy-any-component",
      },
      {
        section: "plugins",
        displayName: "Copy components",
        uid: "copy",
        pluginName: "copy-any-component",
      },
      {
        section: "plugins",
        displayName: "Update page sections",
        uid: "sections.update",
        pluginName: "copy-any-component",
      },
      {
        section: "plugins",
        displayName: "Publish pages",
        uid: "publish",
        pluginName: "copy-any-component",
      },
    ];
    
    strapi.admin.services.permission.actionProvider.registerMany(actions);
  },
  controllers: {
    controller,
  },
  services: {
    "component-copy": componentCopyService,
  },
  routes: {
    "content-api": {
      type: "content-api",
      routes: contentApiRoutes,
    },
    admin: {
      type: "admin",
      routes: [
        {
          method: "GET",
          path: "/content-types",
          handler: "controller.getContentTypes",
          config: {
            policies: [],
          },
        },
        {
          method: "PUT",
          path: "/config",
          handler: "controller.updateConfig",
          config: {
            policies: [],
          },
        },
        {
          method: "GET",
          path: "/pages",
          handler: "controller.getPages",
          config: {
            policies: [],
          },
        },
        {
          method: "GET",
          path: "/pages/:pageId/sections",
          handler: "controller.getPageSections",
          config: {
            policies: [],
          },
        },
        {
          method: "POST",
          path: "/pages/:sourcePageId/copy-to/:targetPageId",
          handler: "controller.copySections",
          config: {
            policies: [],
          },
        },
        {
          method: "POST",
          path: "/pages/:sourcePageId/move-to/:targetPageId",
          handler: "controller.moveSections",
          config: {
            policies: [],
          },
        },
        {
          method: "PUT",
          path: "/pages/:pageId/sections",
          handler: "controller.updatePageSections",
          config: {
            policies: [],
          },
        },
        {
          method: "POST",
          path: "/pages/:pageId/publish",
          handler: "controller.publishPage",
          config: {
            policies: [],
          },
        },
      ],
    },
  },
};

