import Header from "@/components/Header";
import Center from "@/components/Center";
import ProductsGrid from "@/components/ProductsGrid";
import Title from "@/components/Title";
import Footer from "@/components/Footer";
import { Product } from "@/models/Product";
import { WishedProduct } from "@/models/WishedProduct";
import { mongooseConnect } from "@/lib/mongoose";
import { authOptions } from "./api/auth/[...nextauth]";
import { getServerSession } from "next-auth";

export default function ProductsPage({products, wishedProducts}) {
  return (
    <>
      <Header />
      <Center>
        <Title>All products</Title >
        <ProductsGrid products={products} wishedProducts={wishedProducts}/>
      </Center>
      <Footer />
    </>
  );
}

export async function getServerSideProps(ctx) {
  await mongooseConnect();
  const products = await Product.find({}, null, {sort:{'_id': -1}});
  const session = await getServerSession(ctx.req, ctx.res, authOptions);
  const wishedProducts = session?.user
    ? await WishedProduct.find({
      userEmail:session?.user.email,
      product: products.map(p => p._id.toString()),
  })
    : [];
  return {
    props: {
      products: JSON.parse(JSON.stringify(products)), 
      wishedProducts: wishedProducts.map(i => i.product.toString()),
    }}; 
}