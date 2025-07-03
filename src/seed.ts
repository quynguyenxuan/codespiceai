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
