import React from 'react';
import classnames from 'classnames';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import useBaseUrl from '@docusaurus/useBaseUrl';
import styles from './styles.module.css';

const features = [
  {
    title: <>Intuitive</>,
    imageUrl: 'img/idea.jpg',
    description: (
      <>
        Variant was designed with minimal friction in mind. With little
        boilerplate and no dependencies, write your types freely and use
        them anywhere.
      </>
    ),
  },
  {
    title: <>Expressive</>,
    imageUrl: 'img/people talking.svg',
    description: (
      <>
        Tools to help you describe your domain, the shapes of your entities,
        and variations in logical flow. Represent your data using Algebraic
        Data Types and increase readibility.
      </>
    ),
  },
  {
    title: <>Type Safe</>,
    imageUrl: 'img/software engineer2.svg',
    description: (
      <>
        Variant is pure TypeScript and built on top of existing patterns. Works
        seamlessly with redux, type narrowing, and async.
      </>
    ),
  },
];

function Feature({imageUrl, title, description}) {
  const imgUrl = useBaseUrl(imageUrl);
  return (
    <div className={classnames('col col--4', styles.feature)}>
      {imgUrl && (
        <div className="text--center">
          <img className={styles.featureImage} src={imgUrl} alt={title}  style={{borderRadius: '50%', margin: '1em'}} />
        </div>
      )}
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  );
}

function Home() {
  const context = useDocusaurusContext();
  const {siteConfig = {}} = context;
  return (
    <Layout
      title={`Hello from ${siteConfig.title}`}
      description="Description will go into a meta tag in <head />">
      <header className={classnames('hero hero--primary', styles.heroBanner)}>
        <div className="container flex-row">
          <img src={'img/variant_logo.png'} height={400} width={400} />
          <div>
            <div style={{
              marginTop: '25%',
            }}>
              <h1 className="hero__title" >{siteConfig.title}</h1>
              <p className="hero__subtitle">{siteConfig.tagline}</p>
              <div className={styles.buttons}>
                <Link
                  className={classnames(
                    'button  button--primary button--lg',
                    styles.getStarted,
                  )}
                  to={useBaseUrl('docs/intro')}
                  style={{color: 'white'}}
                >
                  Get Started
                </Link>
              </div>
              </div>
          </div>
        </div>
      </header>
      <main>
        {features && features.length && (
          <section className={styles.features}>
            <div className="container">
              <div className="row">
                {features.map((props, idx) => (
                  <Feature key={idx} {...props} />
                ))}
              </div>
            </div>
          </section>
        )}
      </main>
    </Layout>
  );
}

export default Home;
