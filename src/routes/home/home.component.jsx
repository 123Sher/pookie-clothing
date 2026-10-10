
import { Outlet } from 'react-router-dom';

import Directory from '../../components/directory/directory.component';

const Home = () => {
  const categories = [
    {
      id: 1,
      title: 'hats',
      imageUrl: '/images/directory/hats.webp',
    },
    {
      id: 2,
      title: 'jackets',
      imageUrl: '/images/directory/jackets.webp',
    },
    {
      id: 3,
      title: 'sneakers',
      imageUrl: '/images/directory/sneakers.webp',
    },
    {
      id: 4,
      title: 'womens',
      imageUrl: '/images/directory/womens.webp',
    },
    {
      id: 5,
      title: 'mens',
      imageUrl: '/images/directory/men.webp',
    },
  ];

  return (
    <div>
      <Directory categories={categories} />
      <Outlet />
    </div>
  );
};

export default Home;
