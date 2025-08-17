import shortid from "shortid";

// Images
import ProductImg1 from "../image/products/1.png";
import ProductImg2 from "../image/products/2.png";
import ProductImg3 from "../image/products/3.png";
import ProductImg4 from "../image/products/4.png";
import ProductImg5 from "../image/products/5.png";
import ProductImg6 from "../image/products/6.png";
import homeImg from "../image/home.jpg";

import Product from "./Product";
import "./Home.css";

function Home() {
  return (
    <div className="home">
      <div className="home-container">
        <img className="home-image" src={homeImg} alt="home-image" />

        <div className="home-row">
          <Product
            id={shortid.generate()}
            title="Kids Headphones - noot products K11 Foldable Stereo Tangle-Free 3.5mm Jack Wired Cord On-Ear Headset for Children/Teens/Boys/Girls/Smartphones/School/Kindle/Airplane Travel/Plane/Tablet (Navy/Teal)"
            pricing={220}
            image={ProductImg1}
            quantity={1}
          />
          <Product
            id={shortid.generate()}
            title="Lenovo Ideapad 3 Slim 15ABR8 Laptop - AMD Ryzen 7 7730U - 8GB - 512GB SSD - Integrated AMD Radeon Graphics - 15.6 FHD - Win11 - Grey"
            pricing={360}
            image={ProductImg2}
            quantity={1}
          />
        </div>

        <div className="home-row">
          <Product
            id={shortid.generate()}
            title="HP Smart Tank 580 Wireless All In One Printer, Print, Scan, Copy, Print up to 18000 black or 6000 color pages - White [1F3Y2A]"
            pricing={55}
            image={ProductImg3}
            quantity={1}
          />
          <Product
            id={shortid.generate()}
            title="KCXGHYI VR SHINECON Virtual Reality VR Headset 3D Glasses Headset Helmets VR Goggles for TV, Movies & Video Games Compatible iOS, Android &Support 4.7-7 inch"
            pricing={402}
            image={ProductImg4}
            quantity={1}
          />
          <Product
            id={shortid.generate()}
            title="TV-MAX USB 2.0 High Speed 360 Degree Rotation Computer WiFi Flash Drive - Wireless Internet Adapter Compatible with All Devices and Systems - Black"
            pricing={146}
            image={ProductImg5}
            quantity={1}
          />
        </div>

        <div className="home-row">
          <Product
            id={shortid.generate()}
            title="Samsung Galaxy A16 LTE, Android Smartphone, Dual SIM Mobile Phone, 6GB RAM, 128GB Storage, Black (1 Year Local Warranty)"
            pricing={55}
            image={ProductImg6}
            quantity={1}
          />
        </div>
      </div>
    </div>
  );
}

export default Home;
