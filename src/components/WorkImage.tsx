import { MdArrowOutward } from "react-icons/md";

interface Props {
  image: string;
  alt?: string;
  video?: string;
  link?: string;
  onOpen?: () => void;
}

const WorkImage = (props: Props) => {
  const isExternal = !!props.link && props.link !== "#";

  return (
    <div className="work-image">
      <a
        className="work-image-in"
        href={isExternal ? props.link : undefined}
        onClick={(e) => {
          if (!isExternal) {
            e.preventDefault();
            props.onOpen?.();
          }
        }}
        target={isExternal ? "_blank" : undefined}
        rel={isExternal ? "noreferrer" : undefined}
        data-cursor={"disable"}
      >
        <div className="work-link">
          <MdArrowOutward />
        </div>
        <img src={props.image} alt={props.alt} />
      </a>
    </div>
  );
};

export default WorkImage;
