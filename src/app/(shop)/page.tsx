export const revalidate = 60; // 60 segundos


import { redirect } from 'next/navigation';

import { getPaginatedProductsWithImages } from '@/actions';
import { Pagination, ProductGrid, Title } from '@/components';



// interface Props {
//   searchParams: {
//     page?: string; 
//   }
// }

interface Props { 
  params: Promise<any>
  searchParams: Promise<any>
} 


export default async function Home({ searchParams }: Props) {

  const searchParamsResolved = await searchParams;
  const page = searchParamsResolved.page ? parseInt(searchParamsResolved.page) : 1;

  const { products, currentPage, totalPages } = await getPaginatedProductsWithImages({ page });


  if ( products.length === 0 ) {
    redirect('/');
  }


  return (
    <>
      <Title
        title="Tienda"
        subtitle="Todos los productos"
        className="mb-2"
      />

      <ProductGrid 
        products={ products }
      />


      <Pagination totalPages={ totalPages } />
      
    </>
  );
}
