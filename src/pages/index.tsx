import { NextPage, GetStaticProps } from "next";
import { FaTwitter, FaGithub } from "react-icons/fa";
import { AiOutlineLink } from "react-icons/ai";

import { PostItem, Member } from "@src/types";
import { PostList } from "@src/components/PostList";
import { ContentWrapper } from "@src/components/ContentWrapper";
import { PageSEO } from "@src/components/PageSEO";
import {
  getMemberById,
  getMemberPostsById,
} from "@src/utils/helper";
import { config } from "@site.config";

type Props = {
  postItems: PostItem[];
  member: Member;
};

const Page: NextPage<Props> = (props) => {
  const {
    id,
    name,
    bio,
    avatarSrc,
    twitterUsername,
    githubUsername,
    websiteUrl,
  } = props.member;

  // 人気記事を選定（ここでは単純に最初の2記事を表示）
  const popularPosts = props.postItems.slice(0, 2);
  // 残りの記事をArticleセクションに表示
  const restPosts = props.postItems;

  return (
    <>
      <PageSEO
        title={`${name} - ${config.siteMeta.teamName}`}
        description={bio}
        path="/"
      />
      <section className="member">
        <ContentWrapper>
          <header className="member-header">
            <div className="member-header__avatar">
              <img
                src={avatarSrc}
                alt={name}
                width={100}
                height={100}
                className="member-header__avatar-img"
              />
            </div>
            <h1 className="member-header__name">{name}</h1>
            <p className="member-header__bio">{bio}</p>
            <div className="member-header__links">
              {twitterUsername && (
                <a
                  href={`https://twitter.com/${twitterUsername}`}
                  className="member-header__link"
                >
                  <FaTwitter
                    className="member-header__link-icon"
                    aria-label={`Follow @${twitterUsername} on Twitter`}
                  />
                </a>
              )}
              {githubUsername && (
                <a
                  href={`https://github.com/${githubUsername}`}
                  className="member-header__link"
                >
                  <FaGithub
                    className="member-header__link-icon"
                    aria-label={`@${githubUsername} on GitHub`}
                  />
                </a>
              )}
              {websiteUrl && (
                <a href={websiteUrl} className="member-header__link">
                  <AiOutlineLink
                    className="member-header__link-icon"
                    aria-label={`Link to website`}
                  />
                </a>
              )}
            </div>
          </header>

          <div className="popular-posts-container">
            <h2 className="section-heading">Popular</h2>
            <PostList items={popularPosts} />
          </div>

          <div className="member-posts-container">
            <h2 className="section-heading">Articles</h2>
            <PostList items={restPosts} />
          </div>
        </ContentWrapper>
      </section>
    </>
  );
};

export const getStaticProps: GetStaticProps<Props> = async () => {
  const id = "catnose";
  const member = getMemberById(id);
  const postItems = getMemberPostsById(id);

  if (!member) throw "User not found";

  return {
    props: {
      member,
      postItems,
    },
  };
};

export default Page;
