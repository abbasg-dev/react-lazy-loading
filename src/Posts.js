import { useRef } from "react";
import clsx from "clsx";
import useLazyLoad from "./useLazyLoad";
import LoadingPosts from "./LoadingPosts";
import posts from './data.json';

const NUM_PER_PAGE = 6;
const TOTAL_PAGES = 3;

const Posts = () => {
    const images = posts["data"];
    const triggerRef = useRef(null);
    const onGrabData = (currentPage) => {
        // This would be where you'll call your API
        return new Promise((resolve) => {
            setTimeout(() => {
                const data = images.slice(
                    ((currentPage - 1) % TOTAL_PAGES) * NUM_PER_PAGE,
                    NUM_PER_PAGE * (currentPage % TOTAL_PAGES)
                );
                resolve(data);
            }, 3000);
        });
    };
    const { data, loading } = useLazyLoad({ triggerRef, onGrabData });
    return (
        <>
            <div className="grid grid-cols-3 gap-4 content-start">
                {data.map((image, i) => {
                    return (
                        <div key={i} className="w-full rounded overflow-hidden shadow-lg m-2">
                            <img className="w-full h-64 object-center" src={image["imageUrl"]} />
                            <div className="px-6 py-4">
                                <div className="font-regular text-xl mb-2">{image["owner"]}</div>
                            </div>
                        </div>
                    )
                })}
            </div>
            <div ref={triggerRef} className={clsx("trigger", { visible: loading })}>
                <LoadingPosts />
            </div>
        </>
    );
}

export default Posts;
