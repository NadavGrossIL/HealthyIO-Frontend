import Head from 'next/head'
import styles from '../styles/Home.module.scss'
import React, {useEffect} from "react";
import {fetchAPI, getStrapiURL} from "../lib/api";

export async function getStaticProps() {
    const services = await fetchAPI("services");
    return {
        props: {services},
        revalidate: 1 //Updates the content when Strapi is updated.
    };
}


export default function Home({services}) {
    useEffect(() => {
        const serviceVideo = document.getElementById('serviceVideo');
        serviceVideo.addEventListener('ended', playWithDelay, false);

        function playWithDelay() {
            setTimeout(function () {
                serviceVideo.play();
            }, 2000);
        }

        playWithDelay();
    });

    const service = services[0];
    let strapiURL = getStrapiURL();
    strapiURL = strapiURL.substring(0, strapiURL.length - 1);

    return (
        <div className={styles.container}>
            <Head>
                <title>Healthy.io App</title>
                <link rel="icon" href="/favicon.ico"/>
            </Head>
            <main className={styles.main}>
                <div className={styles.main__title}>{service.Title}</div>
                <div className={styles.main__service}>
                    <div id="videoWrapper" className={styles.main__videoWrapper}>
                        <video id="serviceVideo" src={strapiURL + service.Video[0].url} className={styles.main__video}
                               muted/>
                    </div>
                    <div className={styles.main__content}>
                        <img className={styles.main__content__upperImage} src={strapiURL + service.TopImage[0].url}/>
                        <div className={styles.main__content__title}>{service.SubTitle}</div>
                        <p className={styles.main__content__text}>{service.content}</p>
                        <a role="link" type="button" href="https://healthy.io/eu/services/wound"
                           className={styles.main__content__learnButton}>Learn more</a>
                    </div>
                </div>
            </main>
        </div>
    )
}
