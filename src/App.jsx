import { lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Layout, NotFound } from './components.jsx';

const Home = lazy(() => import('./pages/Home.jsx'));
const About = lazy(() => import('./pages/About.jsx'));
const Business = lazy(() => import('./pages/Business.jsx'));
const Products = lazy(() => import('./pages/Products.jsx'));
const Partner = lazy(() => import('./pages/Partner.jsx'));
const Locations = lazy(() => import('./pages/Locations.jsx'));
const Contact = lazy(() => import('./pages/Contact.jsx'));

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="tentang" element={<About />} />
        <Route path="bisnis/:slug" element={<Business />} />
        <Route path="produk" element={<Products />} />
        <Route path="mitra" element={<Partner />} />
        <Route path="lokasi" element={<Locations />} />
        <Route path="kontak" element={<Contact />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
