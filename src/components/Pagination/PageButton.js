import "./pagination.css";
const PageButton = (props) => {
  return (
    <div
      className={
        "page-btn " +
        (props.disable ? "btn-disable " : "") +
        (props.active ? "btn-active " : "")
      }
      onClick={props.onClick}
    >
      {props.children}
    </div>
  );
};
export default PageButton;
