/**
 * 生成结构化数据，帮助搜索引擎更好地理解网站内容
 */

// VPS优惠的结构化数据
export function generateVPSDealSchema(deal: any) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: deal.title,
    description: deal.description,
    brand: {
      '@type': 'Brand',
      name: typeof deal.provider === 'string' ? deal.provider : deal.provider.name
    },
    offers: {
      '@type': 'Offer',
      price: deal.price,
      priceCurrency: deal.currency || 'USD',
      availability: 'https://schema.org/InStock',
      url: `https://vvps.vercel.app/deals/${deal.id}`,
      ...(deal.expiryDate && { validThrough: deal.expiryDate }),
      ...(deal.originalPrice && { priceValidUntil: deal.expiryDate || new Date(new Date().setFullYear(new Date().getFullYear() + 1)).toISOString().split('T')[0] })
    },
    ...(deal.specs && {
      additionalProperty: [
        {
          '@type': 'PropertyValue',
          name: 'CPU',
          value: deal.specs.cpu
        },
        {
          '@type': 'PropertyValue',
          name: 'RAM',
          value: deal.specs.ram
        },
        {
          '@type': 'PropertyValue',
          name: 'Storage',
          value: deal.specs.storage
        },
        {
          '@type': 'PropertyValue',
          name: 'Bandwidth',
          value: deal.specs.bandwidth
        }
      ]
    })
  };
}

// 服务提供商的结构化数据
export function generateProviderSchema(provider: any) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: provider.name,
    description: provider.description,
    url: provider.website,
    logo: provider.logo,
    sameAs: [
      provider.website,
      provider.socialLinks?.twitter,
      provider.socialLinks?.facebook,
      provider.socialLinks?.linkedin
    ].filter(Boolean)
  };
}

// 博客文章的结构化数据
export function generateBlogPostSchema(post: any, baseUrl: string = 'https://vvps.vercel.app') {
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.excerpt,
    image: post.coverImage,
    datePublished: post.publishDate,
    dateModified: post.updatedAt || post.publishDate,
    author: {
      '@type': 'Person',
      name: post.author,
      url: `${baseUrl}/authors/${post.author.toLowerCase().replace(/\s+/g, '-')}`
    },
    publisher: {
      '@type': 'Organization',
      name: 'VPS优惠折扣',
      logo: {
        '@type': 'ImageObject',
        url: `${baseUrl}/logo.png`
      }
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${baseUrl}/blog/${post.id}`
    },
    keywords: post.tags.join(', ')
  };
}

// FAQ页面的结构化数据
export function generateFAQSchema(faqs: Array<{question: string, answer: string}>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(faq => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer
      }
    }))
  };
}

// 面包屑导航的结构化数据
export function generateBreadcrumbSchema(items: Array<{name: string, url: string}>, baseUrl: string = 'https://vvps.vercel.app') {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `${baseUrl}${item.url}`
    }))
  };
}

// 本地商家的结构化数据（用于提高本地SEO）
export function generateLocalBusinessSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: 'VPS优惠折扣',
    description: '提供全球最佳VPS服务器优惠和折扣信息',
    url: 'https://vvps.vercel.app',
    telephone: '+86-XXX-XXXX-XXXX',
    address: {
      '@type': 'PostalAddress',
      streetAddress: '某某路XX号',
      addressLocality: '上海',
      addressRegion: '上海',
      postalCode: '200000',
      addressCountry: 'CN'
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: '31.2304',
      longitude: '121.4737'
    },
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: [
        'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'
      ],
      opens: '09:00',
      closes: '18:00'
    }
  };
}