import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import { PropTypes } from 'prop-types';

const Buttons = ({text , link , style}) => {
  return (
    <div>
      <Link  to={`/${link}`}>
        <Button className={style} variant="outlined">
          {text}
        </Button>
      </Link>
    </div>
  );
};

export default Buttons;


Buttons.propTypes = {
    text: PropTypes.string.isRequired,
    link: PropTypes.string.isRequired,
    style: PropTypes.string.isRequired
  }