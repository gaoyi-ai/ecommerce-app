import Head from 'next/head'
import Announcement from "../components/Announcement";
import Navbar from "../components/Navbar";
import Slider from "../components/Slider";
import Categories from "../components/Categories";
import ProductList from "../components/ProductList";
import Newsletter from "../components/Newsletter";
import Footer from "../components/Footer";

export default function Home({data}) {
  return (
    <div>
      <Head>
        <title>Lama Ecommerce Shop</title>
        {/*<link*/}
        {/*  href="https://fonts.googleapis.com/css2?family=Urbanist:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap"*/}
        {/*  rel="stylesheet"/>*/}
      </Head>

      <div>
        <Announcement/>
        <Navbar/>
        <Slider/>
        <Categories/>
        <ProductList data={data}/>
        <Newsletter/>
        <Footer/>
      </div>
    </div>
  )
}

// This also gets called at build time
export async function getStaticProps() {
  // params contains the post `id`.
  // If the route is like /posts/1, then params.id is 1
  const res = await fetch('http://localhost:5000/api/products')
  const data = await res.json()

  // Pass post data to the page via props
  return {props: {data}}
}