import React from 'react';
import FeaturesSix from '../../components/features/FeaturesSix';
import LightSpeed from 'react-reveal/LightSpeed';
import TextLoop from "react-text-loop";

const HomeServices = () => {

    const features = [
        {
            headline: 'Web Development', 
            description: 'We build everything from landing pages to fullstack single page applications',
            icon: ''
        },
        {
            headline: 'Online Advertising', 
            description: 'We provide targeted online advertising through Facebook and Google ads',
            icon: ''
        },
        {
            headline: 'Data Visualizations', 
            description: 'Creating custom built reports using Tableau or Power BI',
            icon: ''
        },
        {
            headline: 'Data Reporting', 
            description: 'Automate your reports using SQL and refreshable spreadsheets',
            icon: ''
        },
        {
            headline: 'Content Writing', 
            description: 'Content writing on an array of topics from technical concepts to social issues',
            icon: ''
        },
        {
            headline: 'Mobile Apps', 
            description: 'Building rich mobile UI apps using React Native',
            icon: ''
        },

    ]
    return (
        <div className = "HomeServices">
            <div className="HomeServices__title">
            <LightSpeed left cascade>
                <h2> Services we provide </h2>
                <div>
                <TextLoop>
                    <span className = "HomeServices__textLoop HomeServices__textLoop-1">Web Development</span>
                    <span className = "HomeServices__textLoop HomeServices__textLoop-2">Digital Marketing</span>
                    <span className = "HomeServices__textLoop HomeServices__textLoop-3">Data Analytics</span>
                    <span className = "HomeServices__textLoop HomeServices__textLoop-4">SEO</span>
                    <span className = "HomeServices__textLoop HomeServices__textLoop-5">Data Visuals</span>
                    <span className = "HomeServices__textLoop HomeServices__textLoop-6">Web Design</span>
                </TextLoop>{" "}
                </div>
            </LightSpeed>
                  <div className = "HomeServices__mission" >
                        Though our mission is to provide free educational content and serve as a learning resource,
                         we provide an array of services in the following areas
                  </div>
            </div>
           
            <div className = "HomeServices__main">
                <FeaturesSix
                    features = { features }
                />
            </div>
          
        </div>
    );
};

export default HomeServices;