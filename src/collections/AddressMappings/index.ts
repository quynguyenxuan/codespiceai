import type { CollectionConfig } from 'payload'
import { authenticated } from '../../access/authenticated'

export const AddressMappings: CollectionConfig = {
  slug: 'address-mappings',
  access: {
    create: () => true,
    delete: authenticated,
    read: () => true,
    update: authenticated,
  },
  admin: { useAsTitle: 'oldWard' },
  fields: [
    { name: 'oldProvince', type: 'text', label: 'Tỉnh/Thành cũ' },
    { name: 'oldDistrict', type: 'text', label: 'Quận/Huyện cũ' },
    { name: 'oldWard', type: 'text', label: 'Phường/Xã cũ' },
    { name: 'newProvince', type: 'text', label: 'Tỉnh/Thành mới' },
    { name: 'newDistrict', type: 'text', label: 'Quận/Huyện mới' },
    { name: 'newWard', type: 'text', label: 'Phường/Xã mới' },
    { name: 'oldProvinceDescription', type: 'text', label: 'Mô tả tỉnh/thành cũ' },
    { name: 'oldDistrictDescription', type: 'text', label: 'Mô tả quận/huyện cũ' },
    { name: 'oldWardDescription', type: 'text', label: 'Mô tả phường/xã cũ' },
    { name: 'newProvinceDescription', type: 'text', label: 'Mô tả tỉnh/thành mới' },
    { name: 'newDistrictDescription', type: 'text', label: 'Mô tả quận/huyện mới' },
    { name: 'newWardDescription', type: 'text', label: 'Mô tả phường/xã mới' },
    { name: 'oldPopulation', type: 'text', label: 'Dân số cũ' },
    { name: 'newPopulation', type: 'text', label: 'Dân số mới' },
    { name: 'oldAreaKm2', type: 'text', label: 'Diện tích cũ (km2)' },
    { name: 'newAreaKm2', type: 'text', label: 'Diện tích mới (km2)' },
    { name: 'oldAdminCenter', type: 'text', label: 'Trung tâm hành chính cũ' },
    { name: 'newAdminCenter', type: 'text', label: 'Trung tâm hành chính mới' },
    { name: 'oldLongitude', type: 'text', label: 'Kinh độ cũ' },
    { name: 'newLongitude', type: 'text', label: 'Kinh độ mới' },
    { name: 'oldLatitude', type: 'text', label: 'Vĩ độ cũ' },
    { name: 'newLatitude', type: 'text', label: 'Vĩ độ mới' },
    { name: 'note', type: 'text', label: 'Ghi chú' },
  ],
}
