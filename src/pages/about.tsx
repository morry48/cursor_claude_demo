import { NextPage } from "next";
import { ContentWrapper } from "@src/components/ContentWrapper";
import { LinkBackHome } from "@src/components/LinkBackHome";
import { PageSEO } from "@src/components/PageSEO";

const Page: NextPage = () => {
  return (
    <>
      <PageSEO title="About" path="/about" />
      <ContentWrapper>
        <section className="about">
          <h1 className="about__title">About</h1>
          <div className="about__body">
            <p>
              このサイトはCatNoseのブログです。デザインが好きなプログラマーとして、主にフロントエンド開発やデザインに関する記事を発信しています。
            </p>
            <p>
              開発者向けの情報共有プラットフォームzenn.devを開発しており、技術的な知見や経験を共有することでエンジニアコミュニティに貢献したいと考えています。
            </p>
            <p>
              Medium、Zennなど複数のプラットフォームに投稿した記事をこのサイトで一覧にまとめて表示しています。
            </p>
            <p>
              お問い合わせやお仕事のご依頼は
              <a href="https://twitter.com/catnose99">Twitter</a>
              または
              <a href="https://github.com/catnose99">GitHub</a>
              からお気軽にご連絡ください。
            </p>
          </div>
          <div className="about__actions">
            <LinkBackHome />
          </div>
        </section>
      </ContentWrapper>
    </>
  );
};

export default Page;
