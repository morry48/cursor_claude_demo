import { useState } from "react";
import Link from "next/link";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

import { PostItem } from "@src/types";
import {
  getFaviconSrcFromOrigin,
  getMemberPath,
  getMemberById,
} from "@src/utils/helper";

dayjs.extend(relativeTime);

const PostLink: React.FC<{ item: PostItem }> = (props) => {
  const { authorId, title, isoDate, link, dateMiliSeconds } = props.item;
  const member = getMemberById(authorId);
  if (!member) return null;

  const { hostname, origin } = new URL(link);
  
  // Zennの記事か判定
  const isZennArticle = hostname === "zenn.dev";

  return (
    <article className="post-link">
      <Link href={getMemberPath(member.id)} passHref>
        <a className="post-link__author">
          <img
            src={member.avatarSrc}
            className="post-link__author-img"
            width={35}
            height={35}
            alt={member.name}
          />
          <div className="post-link__author-name">
            <div className="post-link__author-name">{member.name}</div>
            <time dateTime={isoDate} className="post-link__date">
              {dayjs(isoDate).fromNow()}
            </time>
          </div>
        </a>
      </Link>
      <a href={link} className="post-link__main-link">
        <h2 className="post-link__title">{title}</h2>
        <div className="post-link__site">
          <img
            src={getFaviconSrcFromOrigin(origin)}
            width={14}
            height={14}
            className="post-link__site-favicon"
            alt={hostname}
          />
          {hostname}
          
          {/* Zennの記事の場合のみいいねアイコンを表示 */}
          {isZennArticle && (
            <span className="post-link__likes">
              <svg 
                className="post-link__likes-icon" 
                fill="currentColor" 
                viewBox="0 0 24 24"
                width="16"
                height="16"
              >
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
              </svg>
              <span className="post-link__likes-count">10+</span>
            </span>
          )}
        </div>
      </a>
      {dateMiliSeconds && dateMiliSeconds > Date.now() - 86400000 * 3 && (
        <div className="post-link__new-label">NEW</div>
      )}
    </article>
  );
};

export const PostList: React.FC<{ items: PostItem[] }> = (props) => {
  const [displayItemsCount, setDisplayItemsCount] = useState<number>(32);
  const totalItemsCount = props.items?.length || 0;
  const canLoadMore = totalItemsCount - displayItemsCount > 0;

  if (!totalItemsCount) {
    return <div className="post-list-empty">No posts yet</div>;
  }

  return (
    <>
      <div className="post-list">
        {props.items.slice(0, displayItemsCount).map((item, i) => (
          <PostLink key={`post-item-${i}`} item={item} />
        ))}
      </div>
      {canLoadMore && (
        <div className="post-list-load">
          <button
            onClick={() => setDisplayItemsCount(displayItemsCount + 32)}
            className="post-list-load__button"
          >
            LOAD MORE
          </button>
        </div>
      )}
    </>
  );
};
