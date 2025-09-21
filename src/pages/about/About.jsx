// src/pages/about/About.jsx
import { LoremIpsum } from 'react-lorem-ipsum';
import { Outlet, Link } from 'react-router-dom';

const About = () => (
  <div className="**:pb-3">
    <h1 className="text-5xl">Over ons</h1>
    <div>
      <LoremIpsum p={2} />

      <ul>
        <li>
          <Link className="text-blue-600 underline ml-6" to='/about/services'>Onze diensten</Link>
        </li>
        <li>
          <Link className="text-blue-600 underline ml-6" to='/about/history'>Geschiedenis</Link>
        </li>
        <li>
          <Link className="text-blue-600 underline ml-6" to='/about/location'>Locatie</Link>
        </li>
      </ul>
    </div>
    <Outlet />
  </div>
);

export const Services = () => (
  <div>
    <h1 className="text-5xl">Onze diensten</h1>
    <LoremIpsum p={2} />
  </div>
);

export const History = () => (
  <div>
    <h1 className="text-5xl">Geschiedenis</h1>
    <LoremIpsum p={2} />
  </div>
);

export const Location = () => (
  <div>
    <h1 className="text-5xl">Locatie</h1>
    <LoremIpsum p={2} />
  </div>
);

export default About;
