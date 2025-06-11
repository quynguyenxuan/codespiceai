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
    const updateData: any = updateProps?.length ? {} : data
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
