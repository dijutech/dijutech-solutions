import { DeliveryZone } from '../types';

export const deliveryZones: DeliveryZone[] = [
  {
    name: 'Lagos Mainland',
    areas: ['Ikeja', 'Surulere', 'Yaba', 'Mushin', 'Alimosho', 'Agege'],
    deliveryFee: 2500,
    estimatedDays: 1,
    installationAvailable: true
  },
  {
    name: 'Lagos Island',
    areas: ['Victoria Island', 'Ikoyi', 'Lekki', 'Ajah', 'Lagos Island'],
    deliveryFee: 3000,
    estimatedDays: 1,
    installationAvailable: true
  },
  {
    name: 'Abuja',
    areas: ['Garki', 'Wuse', 'Maitama', 'Asokoro', 'Gwarinpa', 'Kubwa'],
    deliveryFee: 4000,
    estimatedDays: 2,
    installationAvailable: true
  },
  {
    name: 'Port Harcourt',
    areas: ['GRA', 'Trans Amadi', 'Mile 1', 'Mile 2', 'Diobu'],
    deliveryFee: 5000,
    estimatedDays: 3,
    installationAvailable: true
  },
  {
    name: 'Kano',
    areas: ['Sabon Gari', 'Fagge', 'Nassarawa', 'Gwale'],
    deliveryFee: 6000,
    estimatedDays: 4,
    installationAvailable: false
  },
  {
    name: 'Ibadan',
    areas: ['Bodija', 'Ring Road', 'Dugbe', 'Mokola', 'UI'],
    deliveryFee: 4500,
    estimatedDays: 3,
    installationAvailable: true
  }
];