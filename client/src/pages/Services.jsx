import React, { useState, useEffect } from 'react';
import "../Styles/Services.css"

export function Services() {
    const [services, setServices] = useState([]);

    useEffect(() => {
        fetch('http://localhost:5000/api/data/service')
            .then(response => response.json())
            .then(Sdata => setServices(Sdata.data))
            .catch(error => console.error(error));
    }, []);

    return (
        <section className="services-section">
            <div className="services-heading">Our Services</div>
            <div className="services-intro">We are providing excellent services for developers, companies, organizations, schools, colleges and many more...</div>
            <div className="services-intro">Our team of experienced professionals is passionate about creating high-quality and user-friendly web solutions. We offer a wide range of services to meet your unique needs, from building modern websites and e-commerce platforms to crafting custom web applications and social media websites.</div>
            <div className="services-intro">Our best services are listed below...</div>

            <hr />

{/* Our Loop Data code started ------------------------------------------------------------------------------ */}
            <div className='Services-cards'>
                {
                    services.map(service => (
                        <div key={service._id} className="Service-card">
                            <div className="Service-category">{service.service_category}</div>
                            <div className="Service-title">{service.service_type}</div>
                            <div className="Service-price">{service.price_range}</div>
                        </div>
                    ))
                }
            </div>
{/* End of Our Loop Data code -------------------------------------------------------------------------------- */}

        </section>
    );
}
