'use client';

import React, { useState } from 'react';
import { Edit, Trash, Save, X, Plus } from 'lucide-react';

export default function ContentManagementPage() {
  // 页面内容状态
  const [pages, setPages] = useState([
    {
      id: 'home',
      title: '首页',
      sections: [
        {
          id: 'hero',
          title: '主横幅',
          content: '发现全球最优惠的VPS特价',
          subtitle: '我们每天更新最新的VPS优惠信息，帮您找到最适合的云服务器',
          isEditing: false
        },
        {
          id: 'featured',
          title: '精选特价',
          content: '我们精心挑选的VPS特价',
          subtitle: '这些是我们认为最值得推荐的特价VPS',
          isEditing: false
        }
      ]
    },
    {
      id: 'about',
      title: '关于我们',
      sections: [
        {
          id: 'mission',
          title: '我们的使命',
          content: '帮助用户找到最优惠的VPS服务',
          subtitle: '我们致力于提供最全面、最及时的VPS优惠信息',
          isEditing: false
        },
        {
          id: 'team',
          title: '我们的团队',
          content: '由一群热爱云计算的技术爱好者组成',
          subtitle: '我们有丰富的云服务器使用经验，了解不同用户的需求',
          isEditing: false
        }
      ]
    },
    {
      id: 'contact',
      title: '联系我们',
      sections: [
        {
          id: 'contact-info',
          title: '联系方式',
          content: '有任何问题或建议，请随时联系我们',
          subtitle: 'email@example.com',
          isEditing: false
        }
      ]
    }
  ]);

  // FAQ管理状态
  const [faqs, setFaqs] = useState([
    {
      id: 'faq-1',
      question: '什么是VPS?',
      answer: 'VPS (Virtual Private Server) 是一种虚拟专用服务器，它在物理服务器上通过虚拟化技术创建多个独立的服务器环境。每个VPS都有自己的操作系统、存储空间、CPU和内存资源，用户可以完全控制自己的VPS，就像拥有一台独立的物理服务器一样。',
      isEditing: false
    },
    {
      id: 'faq-2',
      question: '如何选择适合我的VPS?',
      answer: '选择VPS时，需要考虑以下几个因素：1) 性能需求：评估您的应用程序需要多少CPU、内存和存储空间；2) 位置：选择靠近目标用户的数据中心；3) 操作系统：确定您需要Windows还是Linux；4) 管理级别：决定是需要完全自我管理还是需要托管服务；5) 预算：在满足需求的前提下，寻找最具性价比的选择。',
      isEditing: false
    },
    {
      id: 'faq-3',
      question: '为什么有些VPS价格差异这么大?',
      answer: 'VPS价格差异主要来源于以下几个方面：1) 硬件规格：CPU、内存、存储空间和带宽的不同配置；2) 数据中心位置：不同地区的运营成本不同；3) 服务质量：包括网络质量、技术支持和SLA保障；4) 虚拟化技术：不同的虚拟化技术可能导致性能差异；5) 品牌溢价：知名提供商通常会收取更高的费用。',
      isEditing: false
    }
  ]);

  // 公告管理状态
  const [announcements, setAnnouncements] = useState([
    {
      id: 'ann-1',
      title: '网站改版上线',
      content: '我们很高兴地宣布，全新改版的VPS优惠网站已经正式上线！新版本带来了更好的用户体验和更丰富的功能。',
      date: '2023-10-15',
      isEditing: false
    },
    {
      id: 'ann-2',
      title: '黑五优惠预告',
      content: '即将到来的黑色星期五，我们将为大家带来众多VPS提供商的超值优惠。请持续关注我们的网站获取最新信息！',
      date: '2023-11-01',
      isEditing: false
    }
  ]);

  // 编辑页面内容
  const handleEditSection = (pageId: string, sectionId: string) => {
    setPages(pages.map(page => {
      if (page.id === pageId) {
        return {
          ...page,
          sections: page.sections.map(section => {
            if (section.id === sectionId) {
              return { ...section, isEditing: true };
            }
            return section;
          })
        };
      }
      return page;
    }));
  };

  // 保存页面内容
  const handleSaveSection = (pageId: string, sectionId: string, content: string, subtitle: string) => {
    setPages(pages.map(page => {
      if (page.id === pageId) {
        return {
          ...page,
          sections: page.sections.map(section => {
            if (section.id === sectionId) {
              return { ...section, content, subtitle, isEditing: false };
            }
            return section;
          })
        };
      }
      return page;
    }));
  };

  // 取消编辑
  const handleCancelEdit = (pageId: string, sectionId: string) => {
    setPages(pages.map(page => {
      if (page.id === pageId) {
        return {
          ...page,
          sections: page.sections.map(section => {
            if (section.id === sectionId) {
              return { ...section, isEditing: false };
            }
            return section;
          })
        };
      }
      return page;
    }));
  };

  // 编辑FAQ
  const handleEditFaq = (id: string) => {
    setFaqs(faqs.map(faq => {
      if (faq.id === id) {
        return { ...faq, isEditing: true };
      }
      return faq;
    }));
  };

  // 保存FAQ
  const handleSaveFaq = (id: string, question: string, answer: string) => {
    setFaqs(faqs.map(faq => {
      if (faq.id === id) {
        return { ...faq, question, answer, isEditing: false };
      }
      return faq;
    }));
  };

  // 取消编辑FAQ
  const handleCancelEditFaq = (id: string) => {
    setFaqs(faqs.map(faq => {
      if (faq.id === id) {
        return { ...faq, isEditing: false };
      }
      return faq;
    }));
  };

  // 添加新FAQ
  const handleAddFaq = () => {
    const newFaq = {
      id: `faq-${Date.now()}`,
      question: '新问题',
      answer: '新回答',
      isEditing: true
    };
    setFaqs([...faqs, newFaq]);
  };

  // 删除FAQ
  const handleDeleteFaq = (id: string) => {
    if (window.confirm('确定要删除这个FAQ吗？')) {
      setFaqs(faqs.filter(faq => faq.id !== id));
    }
  };

  // 编辑公告
  const handleEditAnnouncement = (id: string) => {
    setAnnouncements(announcements.map(ann => {
      if (ann.id === id) {
        return { ...ann, isEditing: true };
      }
      return ann;
    }));
  };

  // 保存公告
  const handleSaveAnnouncement = (id: string, title: string, content: string, date: string) => {
    setAnnouncements(announcements.map(ann => {
      if (ann.id === id) {
        return { ...ann, title, content, date, isEditing: false };
      }
      return ann;
    }));
  };

  // 取消编辑公告
  const handleCancelEditAnnouncement = (id: string) => {
    setAnnouncements(announcements.map(ann => {
      if (ann.id === id) {
        return { ...ann, isEditing: false };
      }
      return ann;
    }));
  };

  // 添加新公告
  const handleAddAnnouncement = () => {
    const today = new Date().toISOString().split('T')[0];
    const newAnnouncement = {
      id: `ann-${Date.now()}`,
      title: '新公告',
      content: '公告内容',
      date: today,
      isEditing: true
    };
    setAnnouncements([...announcements, newAnnouncement]);
  };

  // 删除公告
  const handleDeleteAnnouncement = (id: string) => {
    if (window.confirm('确定要删除这个公告吗？')) {
      setAnnouncements(announcements.filter(ann => ann.id !== id));
    }
  };

  return (
    <div className="space-y-6">
      {/* 标题 */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-white mb-2">内容管理</h1>
          <p className="text-gray-400">管理网站页面内容、FAQ和公告</p>
        </div>
      </div>
      
      {/* 页面内容管理 */}
      <div className="mb-10">
        <h2 className="text-xl font-semibold mb-4 text-white">页面内容管理</h2>
        
        {pages.map(page => (
          <div key={page.id} className="mb-6 cyber-card p-6">
            <h3 className="text-lg font-medium mb-4 text-white">{page.title} 页面</h3>
            
            {page.sections.map(section => (
              <div key={section.id} className="mb-4 p-4 bg-dark-800/50 rounded-lg">
                <div className="flex justify-between items-center mb-2">
                  <h4 className="text-lg font-medium text-white">{section.title}</h4>
                  
                  {!section.isEditing ? (
                    <button
                      onClick={() => handleEditSection(page.id, section.id)}
                      className="p-1 text-gray-400 hover:text-primary-400"
                    >
                      <Edit size={18} />
                    </button>
                  ) : (
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleSaveSection(
                          page.id,
                          section.id,
                          (document.getElementById(`${section.id}-content`) as HTMLTextAreaElement).value,
                          (document.getElementById(`${section.id}-subtitle`) as HTMLTextAreaElement).value
                        )}
                        className="p-1 text-green-400 hover:text-green-300"
                      >
                        <Save size={18} />
                      </button>
                      <button
                        onClick={() => handleCancelEdit(page.id, section.id)}
                        className="p-1 text-red-400 hover:text-red-300"
                      >
                        <X size={18} />
                      </button>
                    </div>
                  )}
                </div>
                
                {!section.isEditing ? (
                  <div>
                    <p className="text-white mb-1">{section.content}</p>
                    <p className="text-gray-400 text-sm">{section.subtitle}</p>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <div>
                      <label className="block text-sm font-medium text-gray-400 mb-1">
                        主要内容
                      </label>
                      <textarea
                        id={`${section.id}-content`}
                        defaultValue={section.content}
                        rows={2}
                        className="cyber-input w-full"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-400 mb-1">
                        副标题/描述
                      </label>
                      <textarea
                        id={`${section.id}-subtitle`}
                        defaultValue={section.subtitle}
                        rows={2}
                        className="cyber-input w-full"
                      />
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        ))}
      </div>
      
      {/* FAQ管理 */}
      <div className="mb-10">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-white">FAQ管理</h2>
          <button
            onClick={handleAddFaq}
            className="glow-button flex items-center space-x-1"
          >
            <Plus size={16} />
            <span>添加FAQ</span>
          </button>
        </div>
        
        <div className="cyber-card p-6">
          {faqs.map(faq => (
            <div key={faq.id} className="mb-4 p-4 bg-dark-800/50 rounded-lg">
              <div className="flex justify-between items-center mb-2">
                <h4 className="text-lg font-medium text-white">
                  {!faq.isEditing ? faq.question : '编辑FAQ'}
                </h4>
                
                {!faq.isEditing ? (
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleEditFaq(faq.id)}
                      className="p-1 text-gray-400 hover:text-primary-400"
                    >
                      <Edit size={18} />
                    </button>
                    <button
                      onClick={() => handleDeleteFaq(faq.id)}
                      className="p-1 text-gray-400 hover:text-red-400"
                    >
                      <Trash size={18} />
                    </button>
                  </div>
                ) : (
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleSaveFaq(
                        faq.id,
                        (document.getElementById(`${faq.id}-question`) as HTMLTextAreaElement).value,
                        (document.getElementById(`${faq.id}-answer`) as HTMLTextAreaElement).value
                      )}
                      className="p-1 text-green-400 hover:text-green-300"
                    >
                      <Save size={18} />
                    </button>
                    <button
                      onClick={() => handleCancelEditFaq(faq.id)}
                      className="p-1 text-red-400 hover:text-red-300"
                    >
                      <X size={18} />
                    </button>
                  </div>
                )}
              </div>
              
              {!faq.isEditing ? (
                <div>
                  <p className="text-white mb-2">{faq.question}</p>
                  <p className="text-gray-400">{faq.answer}</p>
                </div>
              ) : (
                <div className="space-y-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-1">
                      问题
                    </label>
                    <textarea
                      id={`${faq.id}-question`}
                      defaultValue={faq.question}
                      rows={2}
                      className="cyber-input w-full"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-1">
                      回答
                    </label>
                    <textarea
                      id={`${faq.id}-answer`}
                      defaultValue={faq.answer}
                      rows={4}
                      className="cyber-input w-full"
                    />
                  </div>
                </div>
              )}
            </div>
          ))}
          
          {faqs.length === 0 && (
            <p className="text-center py-4 text-gray-400">暂无FAQ，请添加</p>
          )}
        </div>
      </div>
      
      {/* 公告管理 */}
      <div>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-white">公告管理</h2>
          <button
            onClick={handleAddAnnouncement}
            className="glow-button flex items-center space-x-1"
          >
            <Plus size={16} />
            <span>添加公告</span>
          </button>
        </div>
        
        <div className="cyber-card p-6">
          {announcements.map(ann => (
            <div key={ann.id} className="mb-4 p-4 bg-dark-800/50 rounded-lg">
              <div className="flex justify-between items-center mb-2">
                <div className="flex items-center">
                  <h4 className="text-lg font-medium text-white mr-3">
                    {!ann.isEditing ? ann.title : '编辑公告'}
                  </h4>
                  {!ann.isEditing && (
                    <span className="text-sm text-gray-400">{ann.date}</span>
                  )}
                </div>
                
                {!ann.isEditing ? (
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleEditAnnouncement(ann.id)}
                      className="p-1 text-gray-400 hover:text-primary-400"
                    >
                      <Edit size={18} />
                    </button>
                    <button
                      onClick={() => handleDeleteAnnouncement(ann.id)}
                      className="p-1 text-gray-400 hover:text-red-400"
                    >
                      <Trash size={18} />
                    </button>
                  </div>
                ) : (
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleSaveAnnouncement(
                        ann.id,
                        (document.getElementById(`${ann.id}-title`) as HTMLInputElement).value,
                        (document.getElementById(`${ann.id}-content`) as HTMLTextAreaElement).value,
                        (document.getElementById(`${ann.id}-date`) as HTMLInputElement).value
                      )}
                      className="p-1 text-green-400 hover:text-green-300"
                    >
                      <Save size={18} />
                    </button>
                    <button
                      onClick={() => handleCancelEditAnnouncement(ann.id)}
                      className="p-1 text-red-400 hover:text-red-300"
                    >
                      <X size={18} />
                    </button>
                  </div>
                )}
              </div>
              
              {!ann.isEditing ? (
                <p className="text-gray-300">{ann.content}</p>
              ) : (
                <div className="space-y-3">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-sm font-medium text-gray-400 mb-1">
                        标题
                      </label>
                      <input
                        type="text"
                        id={`${ann.id}-title`}
                        defaultValue={ann.title}
                        className="cyber-input w-full"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-400 mb-1">
                        日期
                      </label>
                      <input
                        type="date"
                        id={`${ann.id}-date`}
                        defaultValue={ann.date}
                        className="cyber-input w-full"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-1">
                      内容
                    </label>
                    <textarea
                      id={`${ann.id}-content`}
                      defaultValue={ann.content}
                      rows={3}
                      className="cyber-input w-full"
                    />
                  </div>
                </div>
              )}
            </div>
          ))}
          
          {announcements.length === 0 && (
            <p className="text-center py-4 text-gray-400">暂无公告，请添加</p>
          )}
        </div>
      </div>
    </div>
  );
}