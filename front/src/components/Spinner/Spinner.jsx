import "./Spinner.scss";

export default function Spinner(props) {
  return (
    <div className="spinner">
      <p className="spinner__text">{props.children}</p>
    </div>
  );
}
