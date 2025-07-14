import type {
  BasePayload,
  CollectionSlug,
  Config,
  PayloadRequest,
  RequiredDataFromCollectionSlug,
} from 'payload'
import { generateSlug } from './utilities/slug'
// import { Part } from '@aws-sdk/client-s3'
// import { DeepPartial } from 'ts-essentials'

export const getOrCreate = async (
  payload: BasePayload,
  { collection, data }: { collection: CollectionSlug; data: any },
) => {
  console.log('getOrCreate', collection, data)
  if (data.id) {
    let exist = await payload
      .findByID({
        collection,
        id: data.id,
      })
      .catch((err) => console.log(err))

    if (exist) {
      exist = await payload.update({
        collection,
        id: data.id,
        data: data,
      })
      return exist
    }
  }

  return await payload.create({
    collection,
    data,
  })
}
export const seed: NonNullable<Config['onInit']> = async (payload): Promise<void> => {
  try {
    console.log('Seeding database...')
    await createOrUpdateByProps(
      payload,
      {
        collection: 'user-roles',
        data: {
          name: 'admin',
          id: 'admin',
          roles: [],
        },
      },
      ['id'],
    )
    await createOrUpdateByProps(
      payload,
      {
        collection: 'users',
        data: {
          email: 'admin@gmail.com',
          password: 'admin',
          roles: [],
        },
      },
      ['email'],
    )

    const categories = [
      {
        title: 'Web Development',
        slug: 'web-development',
      },
      {
        title: 'Mobile',
        slug: 'mobile',
      },
      {
        title: 'DevOps',
        slug: 'devops',
      },
      {
        title: 'AI & ML',
        slug: 'ai-ml',
      },
      {
        title: 'Design',
        slug: 'design',
      },
    ]

    const createdCategories = []
    for (const category of categories) {
      const createdCategory = await createOrUpdateByProps(
        payload,
        {
          collection: 'categories',
          data: category,
        },
        ['slug'],
      )
      createdCategories.push(createdCategory)
    }

    const adminUser = await createOrUpdateByProps(
      payload,
      {
        collection: 'users',
        data: {
          email: 'admin@gmail.com',
          password: 'admin',
          roles: [],
        },
      },
      ['email'],
    )

    const mediaItems = [
      {
        filename: 'nextjs-cover.jpg',
        alt: 'Next.js Cover',
      },
      {
        filename: 'tailwind-cover.jpg',
        alt: 'Tailwind CSS Cover',
      },
      {
        filename: 'accessibility-cover.jpg',
        alt: 'Accessibility Cover',
      },
      {
        filename: 'state-management-cover.jpg',
        alt: 'State Management Cover',
      },
      {
        filename: 'mobile-frameworks-cover.jpg',
        alt: 'Mobile Frameworks Cover',
      },
      {
        filename: 'devops-cover.jpg',
        alt: 'DevOps Cover',
      },
      {
        filename: 'ml-js-cover.jpg',
        alt: 'ML JS Cover',
      },
      {
        filename: 'design-trends-cover.jpg',
        alt: 'Design Trends Cover',
      },
      {
        filename: 'github-actions-cover.jpg',
        alt: 'GitHub Actions Cover',
      },
      {
        filename: 'react-performance-cover.jpg',
        alt: 'React Performance Cover',
      },
      {
        filename: 'llm-cover.jpg',
        alt: 'LLM Cover',
      },
      {
        filename: 'css-grid-cover.jpg',
        alt: 'CSS Grid Cover',
      },
    ]

    const createdMedia = []
    for (const mediaItem of mediaItems) {
      const existingMedia = await payload.find({
        collection: 'media',
        where: {
          filename: {
            equals: mediaItem.filename,
          },
        },
      })

      if (existingMedia.docs.length > 0) {
        createdMedia.push(existingMedia.docs[0])
      } else {
        // NOTE: This will only work if the images are already in public/images
        // In a real scenario, you'd upload them or use a mock
        const newMedia = await payload.create({
          collection: 'media',
          data: {
            alt: mediaItem.alt,
            filename: mediaItem.filename,
            url: `/images/blog/${mediaItem.filename}`, // Assuming images are in public/images/blog
          },
        })
        createdMedia.push(newMedia)
      }
    }

    const posts = [
      {
        title: 'Getting Started with Next.js 14',
        slug: 'getting-started-with-nextjs-14',
        heroImage: createdMedia.find((m) => m.filename === 'nextjs-cover.jpg')?.id,
        content: {
          root: {
            type: 'root',
            children: [
              {
                type: 'paragraph',
                children: [
                  {
                    type: 'text',
                    text: "Learn how to build modern web applications with Next.js 14. We'll cover the new App Router, Server Components, and more.",
                  },
                ],
              },
            ],
          },
        },
        categories: [createdCategories.find((c) => c.slug === 'web-development')?.id],
        publishedAt: new Date('2025-05-20T00:00:00Z').toISOString(),
        authors: [adminUser.id],
        _status: 'published',
      },
      {
        title: 'The Power of Tailwind CSS',
        slug: 'power-of-tailwind-css',
        heroImage: createdMedia.find((m) => m.filename === 'tailwind-cover.jpg')?.id,
        content: {
          root: {
            type: 'root',
            children: [
              {
                type: 'paragraph',
                children: [
                  {
                    type: 'text',
                    text: 'Discover how Tailwind CSS can streamline your styling workflow and help you build beautiful, responsive interfaces faster than ever.',
                  },
                ],
              },
            ],
          },
        },
        categories: [createdCategories.find((c) => c.slug === 'web-development')?.id],
        publishedAt: new Date('2025-05-15T00:00:00Z').toISOString(),
        authors: [adminUser.id],
        _status: 'published',
      },
      {
        title: 'Building Accessible UI Components',
        slug: 'building-accessible-ui-components',
        heroImage: createdMedia.find((m) => m.filename === 'accessibility-cover.jpg')?.id,
        content: {
          root: {
            type: 'root',
            children: [
              {
                type: 'paragraph',
                children: [
                  {
                    type: 'text',
                    text: 'Best practices for creating accessible and inclusive user interfaces that work for everyone, regardless of ability or disability.',
                  },
                ],
              },
            ],
          },
        },
        categories: [createdCategories.find((c) => c.slug === 'design')?.id],
        publishedAt: new Date('2025-05-10T00:00:00Z').toISOString(),
        authors: [adminUser.id],
        _status: 'published',
      },
      {
        title: 'State Management in React Applications',
        slug: 'state-management-react-applications',
        heroImage: createdMedia.find((m) => m.filename === 'state-management-cover.jpg')?.id,
        content: {
          root: {
            type: 'root',
            children: [
              {
                type: 'paragraph',
                children: [
                  {
                    type: 'text',
                    text: 'Comparing different state management solutions for React apps including Context API, Redux, Zustand, and Jotai. Which one is right for your project?',
                  },
                ],
              },
            ],
          },
        },
        categories: [createdCategories.find((c) => c.slug === 'web-development')?.id],
        publishedAt: new Date('2025-05-05T00:00:00Z').toISOString(),
        authors: [adminUser.id],
        _status: 'published',
      },
      {
        title: 'Flutter vs React Native in 2025',
        slug: 'flutter-vs-react-native-2025',
        heroImage: createdMedia.find((m) => m.filename === 'mobile-frameworks-cover.jpg')?.id,
        content: {
          root: {
            type: 'root',
            children: [
              {
                type: 'paragraph',
                children: [
                  {
                    type: 'text',
                    text: 'A comprehensive comparison of the two most popular cross-platform mobile development frameworks in 2025. Which one should you choose?',
                  },
                ],
              },
            ],
          },
        },
        categories: [createdCategories.find((c) => c.slug === 'mobile')?.id],
        publishedAt: new Date('2025-04-28T00:00:00Z').toISOString(),
        authors: [adminUser.id],
        _status: 'published',
      },
      {
        title: 'Introduction to Docker and Kubernetes',
        slug: 'intro-docker-kubernetes',
        heroImage: createdMedia.find((m) => m.filename === 'devops-cover.jpg')?.id,
        content: {
          root: {
            type: 'root',
            children: [
              {
                type: 'paragraph',
                children: [
                  {
                    type: 'text',
                    text: 'Learn the basics of containerization with Docker and orchestration with Kubernetes to streamline your deployment process.',
                  },
                ],
              },
            ],
          },
        },
        categories: [createdCategories.find((c) => c.slug === 'devops')?.id],
        publishedAt: new Date('2025-04-22T00:00:00Z').toISOString(),
        authors: [adminUser.id],
        _status: 'published',
      },
      {
        title: 'Getting Started with Machine Learning in JavaScript',
        slug: 'machine-learning-javascript',
        heroImage: createdMedia.find((m) => m.filename === 'ml-js-cover.jpg')?.id,
        content: {
          root: {
            type: 'root',
            children: [
              {
                type: 'paragraph',
                children: [
                  {
                    type: 'text',
                    text: 'Explore how to implement machine learning models directly in the browser using TensorFlow.js and other JavaScript libraries.',
                  },
                ],
              },
            ],
          },
        },
        categories: [createdCategories.find((c) => c.slug === 'ai-ml')?.id],
        publishedAt: new Date('2025-04-18T00:00:00Z').toISOString(),
        authors: [adminUser.id],
        _status: 'published',
      },
      {
        title: 'UI/UX Design Trends for 2025',
        slug: 'ui-ux-design-trends-2025',
        heroImage: createdMedia.find((m) => m.filename === 'design-trends-cover.jpg')?.id,
        content: {
          root: {
            type: 'root',
            children: [
              {
                type: 'paragraph',
                children: [
                  {
                    type: 'text',
                    text: 'Stay ahead of the curve with these emerging UI/UX design trends that are shaping the digital landscape in 2025.',
                  },
                ],
              },
            ],
          },
        },
        categories: [createdCategories.find((c) => c.slug === 'design')?.id],
        publishedAt: new Date('2025-04-12T00:00:00Z').toISOString(),
        authors: [adminUser.id],
        _status: 'published',
      },
      {
        title: 'Building a CI/CD Pipeline with GitHub Actions',
        slug: 'cicd-github-actions',
        heroImage: createdMedia.find((m) => m.filename === 'github-actions-cover.jpg')?.id,
        content: {
          root: {
            type: 'root',
            children: [
              {
                type: 'paragraph',
                children: [
                  {
                    type: 'text',
                    text: 'A step-by-step guide to setting up a continuous integration and deployment pipeline using GitHub Actions for your web projects.',
                  },
                ],
              },
            ],
          },
        },
        categories: [createdCategories.find((c) => c.slug === 'devops')?.id],
        publishedAt: new Date('2025-04-08T00:00:00Z').toISOString(),
        authors: [adminUser.id],
        _status: 'published',
      },
      {
        title: 'Optimizing React Performance',
        slug: 'optimizing-react-performance',
        heroImage: createdMedia.find((m) => m.filename === 'react-performance-cover.jpg')?.id,
        content: {
          root: {
            type: 'root',
            children: [
              {
                type: 'paragraph',
                children: [
                  {
                    type: 'text',
                    text: 'Advanced techniques to optimize your React applications for better performance and user experience.',
                  },
                ],
              },
            ],
          },
        },
        categories: [createdCategories.find((c) => c.slug === 'web-development')?.id],
        publishedAt: new Date('2025-04-03T00:00:00Z').toISOString(),
        authors: [adminUser.id],
        _status: 'published',
      },
      {
        title: 'Introduction to Large Language Models',
        slug: 'intro-large-language-models',
        heroImage: createdMedia.find((m) => m.filename === 'llm-cover.jpg')?.id,
        content: {
          root: {
            type: 'root',
            children: [
              {
                type: 'paragraph',
                children: [
                  {
                    type: 'text',
                    text: "Understanding the fundamentals of Large Language Models (LLMs) and how they're transforming software development.",
                  },
                ],
              },
            ],
          },
        },
        categories: [createdCategories.find((c) => c.slug === 'ai-ml')?.id],
        publishedAt: new Date('2025-03-28T00:00:00Z').toISOString(),
        authors: [adminUser.id],
        _status: 'published',
      },
      {
        title: 'Building Responsive Layouts with CSS Grid',
        slug: 'css-grid-responsive-layouts',
        heroImage: createdMedia.find((m) => m.filename === 'css-grid-cover.jpg')?.id,
        content: {
          root: {
            type: 'root',
            children: [
              {
                type: 'paragraph',
                children: [
                  {
                    type: 'text',
                    text: 'Master CSS Grid to create complex, responsive layouts with less code and better maintainability.',
                  },
                ],
              },
            ],
          },
        },
        categories: [createdCategories.find((c) => c.slug === 'web-development')?.id],
        publishedAt: new Date('2025-03-22T00:00:00Z').toISOString(),
        authors: [adminUser.id],
        _status: 'published',
      },
    ]

    for (const post of posts) {
      await createOrUpdateByProps(
        payload,
        {
          collection: 'posts',
          data: post,
        },
        ['slug'],
      )
    }

    const projects = [
      {
        title: 'Wehelp',
        description:
          'Nền tảng kết nối người mua và người bán kỹ năng, giúp mọi người chia sẻ và học hỏi các kỹ năng đa dạng.',
        fullDescription:
          'Wehelp là một website và ứng dụng di động cho phép người dùng đăng ký cung cấp hoặc tìm kiếm các kỹ năng từ nhiều lĩnh vực khác nhau, từ dạy học, thiết kế, đến sửa chữa. Nền tảng này tạo ra một thị trường linh hoạt, nơi người dùng có thể dễ dàng kết nối và giao dịch.',
        // image: '/images/wehelp.jpg',
        tech: 'React, Node.js, MongoDB, Flutter',
        client: 'Wehelp Inc.',
        // date: 'Tháng 6, 2023',
      },
      {
        title: 'Iki',
        description: 'Dịch vụ kết nối shipper với khách hàng, tối ưu hóa quy trình giao hàng.',
        fullDescription:
          'Iki là một nền tảng kết nối shipper và khách hàng, cung cấp giải pháp giao hàng nhanh chóng, tiện lợi. Ứng dụng hỗ trợ theo dõi đơn hàng theo thời gian thực, quản lý shipper và tích hợp thanh toán trực tuyến, mang lại trải nghiệm mượt mà cho cả hai bên.',
        // image: '/images/iki.jpg',
        tech: 'React Native, Express.js, PostgreSQL, AWS',
        client: 'Iki Logistics',
        // date: 'Tháng 9, 2023',
      },
      {
        title: 'Ứng dụng Dịch vụ Sân bay',
        description: 'Ứng dụng hỗ trợ hành khách tại sân bay và quảng bá du lịch.',
        fullDescription:
          'Ứng dụng này cung cấp các dịch vụ hướng dẫn hành khách tại sân bay, bao gồm thông tin chuyến bay, bản đồ sân bay, và hỗ trợ đặt dịch vụ. Ngoài ra, ứng dụng tích hợp các nội dung quảng cáo du lịch để giới thiệu các điểm đến hấp dẫn, giúp nâng cao trải nghiệm của hành khách.',
        // image: '/images/airport-service.jpg',
        tech: 'Flutter, Firebase, Google Maps API',
        client: 'Airport Solutions',
        // date: 'Tháng 12, 2023',
      },
      {
        title: 'Nền tảng Ecommerce eSIM Quốc tế',
        description: 'Nền tảng bán eSIM quốc tế cho khách du lịch và doanh nghiệp.',
        fullDescription:
          'Nền tảng thương mại điện tử này cho phép người dùng mua eSIM quốc tế để sử dụng dữ liệu di động ở nhiều quốc gia. Hệ thống hỗ trợ thanh toán đa dạng, giao diện thân thiện và tích hợp với các nhà cung cấp eSIM toàn cầu, đáp ứng nhu cầu của khách du lịch và doanh nghiệp.',
        // image: '/images/esim-ecommerce.jpg',
        tech: 'React, Laravel, MySQL, Stripe',
        client: 'Global eSIM Solutions',
        // date: 'Tháng 3, 2024',
      },
      {
        title: 'OrderNgay',
        description: 'Dịch vụ bán đồ ăn trực tuyến, kết nối nhà hàng và khách hàng.',
        fullDescription:
          'OrderNgay là nền tảng đặt món ăn trực tuyến, cho phép khách hàng dễ dàng duyệt thực đơn, đặt món từ các nhà hàng địa phương và theo dõi đơn hàng. Hệ thống tích hợp thanh toán trực tuyến và quản lý giao hàng, mang lại trải nghiệm tiện lợi cho người dùng.',
        // image: '/images/ordernay.jpg',
        tech: 'Vue.js, Node.js, MongoDB, Google Cloud',
        client: 'OrderNgay Co.',
        // date: 'Tháng 7, 2024',
      },
      {
        title: 'Bảo tàng Tâm hồn',
        description: 'Dự án quản lý tro cốt, mang lại sự an yên và tôn kính.',
        fullDescription:
          'Bảo tàng Tâm hồn là một dự án đặc biệt, cung cấp nền tảng quản lý thông tin tro cốt của người đã mất, giúp gia đình lưu giữ ký ức và thực hiện các nghi thức tưởng nhớ. Hệ thống đảm bảo tính bảo mật, tôn nghiêm và dễ dàng truy cập thông tin.',
        // image: '/images/soul-museum.jpg',
        tech: 'Angular, Python, PostgreSQL, AWS S3',
        client: 'Soul Museum Foundation',
        // date: 'Tháng 10, 2024',
      },
      {
        title: 'KiefDelivery',
        description: 'Nền tảng thương mại điện tử bán đồ điện tử trực tuyến.',
        fullDescription:
          'KiefDelivery là nền tảng thương mại điện tử chuyên cung cấp các sản phẩm điện tử như điện thoại, máy tính bảng, và phụ kiện. Hệ thống hỗ trợ tìm kiếm sản phẩm, đánh giá người bán, và tích hợp logistics để đảm bảo giao hàng nhanh chóng và an toàn.',
        // image: '/images/kiefdelivery.jpg',
        tech: 'React, Django, MySQL, Elasticsearch',
        client: 'KiefDelivery Ltd.',
        // date: 'Tháng 1, 2025',
      },
    ]
    for (const project of projects) {
      await createOrUpdateByProps(
        payload,
        {
          collection: 'projects',
          data: project,
        },
        ['title'],
      )
    }
  } catch (error) {
    console.log(error)
  }
}

export const createOrUpdateByProps = async <T>(
  payload: BasePayload,
  { collection, data }: { collection: CollectionSlug; data: Partial<T> },
  propNames: Array<keyof T>,
  updateProps?: Array<keyof T>,
): Promise<T> => {
  let id = (data as any).id
  let exist: any
  if (id || id === 0) {
    exist = (await payload
      .findByID({
        collection,
        id: id,
      })
      .catch((e) => console.log(e))) as T
    // .catch(err => console.log(err))
  }
  if ((id <= 0 || id == null || id === undefined) && !exist) {
    const cons: any = {}
    if (propNames?.length) {
      for (const propName of propNames) {
        cons[propName] = { equals: data[propName] }
      }
    }
    if (cons) {
      // try{
      const exists = await payload.find({
        collection,
        where: cons,
      })

      if (exists.docs.length > 0) {
        exist = exists.docs[0]
        id = exist.id
      }
      // }catch(e){
      //   console.log(e, cons, collection, data)
      // }
    }
  }
  if (exist && id > 0) {
    const updateData: Partial<T> = updateProps?.length ? {} : data
    if (updateProps?.length) {
      for (const updateProp of updateProps) {
        if (data[updateProp] != null && data[updateProp] !== undefined) {
          updateData[updateProp] = data[updateProp]
        }
      }
    }
    // console.log("updateData", collection, updateData)
    exist = (await payload.update({
      collection,
      id: id,
      data: updateData,
    })) as T
    return exist
  }
  // console.log("createData", collection, data)
  if (!exist) {
    exist = (await payload.create({
      collection,
      data,
    })) as T
  }

  return exist
}

export const updateDocList = <T = any>(docs: T[], doc: T) => {
  const idx = docs.findIndex((d) => (d as any).id === (doc as any).id)
  if (idx > 0) {
    docs[idx] = doc
  } else {
    docs.push(doc)
  }
}
