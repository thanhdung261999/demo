import "./Button.scss";
import { FcPlus } from "react-icons/fc";

export const UploadImage = (props) => {
  return (
    <label htmlFor={props.htmlFor} className="form-label label-upload">
      <FcPlus />
      Upload file image
    </label>
  );
};
