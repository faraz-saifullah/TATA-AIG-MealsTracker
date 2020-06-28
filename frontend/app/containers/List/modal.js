import React, { memo } from "react";
import PropTypes from "prop-types";
import { compose, bindActionCreators } from "redux";
import { withStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import NativeSelect from "@material-ui/core/NativeSelect";
import FormHelperText from "@material-ui/core/FormHelperText";
import { createStructuredSelector } from "reselect";
import { connect } from "react-redux";
import injectReducer from "utils/injectReducer";
import axios from "axios";
import CenteredSection from "./CenteredSection";
import Form from "./Form";
import Button from "../../components/Button";
import Input from "./Input";
import { makeSelectList } from "./selectors";
import { addToList } from "./actions";
import reducer from "./reducer";
import { BASE_URL } from "../App/constants";
// import cookie from 'react-cookies'

const styles = theme => ({  
  paper: {
    position: "absolute",
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: "1px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 4),
    outline: "none"
  }
});

class SimpleModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      native: "English",
      word: "",
      foreign: "Spanish",
      translation: ""
    };
  }

  async handleSubmit() {
    // eslint-disable-next-line react/prop-types
    // let languages = await axios.get(`${BASE_URL}/api/v1/languages`);
    // let nativeKey = "";
    // let foreignKey = "";
    // languages = languages.data.data;
    // for (let i = 0; i < languages.length; i++) {
    //   if (languages[i].name == this.state.native) nativeKey = languages[i]._id;
    //   if (languages[i].name == this.state.foreign)
    //     foreignKey = languages[i]._id;
    // }
    const x = await axios.post(`${BASE_URL}/auth/login`, {
      email: "admin1@meals.com",
      password: "admin@123"
    });

    // console.log('hello', new Cookies().);
    // console.log(document.cookie);

    console.log(x.headers)
    // window.location.reload();
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  getModalStyle() {
    const top = 50;
    const left = 50;

    return {
      top: `${top}%`,
      left: `${left}%`,
      transform: `translate(-${top}%, -${left}%)`
    };
  }

  handleOpen = () => {
    this.setState({
      open: true
    });
  };

  handleClose = () => {
    this.setState({
      open: false
    });
  };

  render() {
    // eslint-disable-next-line react/prop-types
    const { classes } = this.props;
    return (
      <div>
        <Button to="/list" type="button" onClick={() => this.handleOpen()}>
          Add To The List
        </Button>
        <Modal
          className="modal"
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          open={this.state.open}
          onClose={() => this.handleClose()}
        >
          <div
            style={{
              top: "50%",
              left: "50%",
              transform: `translate(-50%, -50%)`
            }}
            className={classes.paper}
          >
            <h1>
              <CenteredSection>
                <Form>
                  <label htmlFor="username">
                    <FormControl>
                      <InputLabel>Native</InputLabel>
                      <NativeSelect
                        name="native"
                        value={this.state.native}
                        onChange={e => this.handleChange(e)}
                      >
                        <option value="English">English</option>
                        <option value="Spanish">Spanish</option>
                        <option value="German">German</option>
                        <option value="Russian">Russian</option>
                      </NativeSelect>
                      <FormHelperText>Select Native Language</FormHelperText>
                    </FormControl>{" "}
                    <FormControl>
                      <InputLabel>Foreign</InputLabel>
                      <NativeSelect
                        name="foreign"
                        value={this.state.foreign}
                        onChange={e => this.handleChange(e)}
                      >
                        <option value="English">English</option>
                        <option value="Spanish">Spanish</option>
                        <option value="German">German</option>
                        <option value="Russian">Russian</option>
                      </NativeSelect>
                      <FormHelperText>Select Native Language</FormHelperText>
                    </FormControl>
                    <br />
                    <Input
                      id="word"
                      type="text"
                      name="word"
                      placeholder="Word"
                      value={this.state.word}
                      onChange={e => this.handleChange(e)}
                    />{" "}
                    <Input
                      id="translation"
                      type="text"
                      name="translation"
                      placeholder="Translation"
                      value={this.state.translation}
                      onChange={e => this.handleChange(e)}
                    />
                  </label>
                  <Button onClick={e => this.handleSubmit(e)}>Add</Button>
                </Form>
              </CenteredSection>
            </h1>
          </div>
        </Modal>
      </div>
    );
  }
}
SimpleModal.protoTypes = {
  classes: PropTypes.object.isRequired,
  addToListCall: PropTypes.func,
  list: PropTypes.array
};

const mapStateToProps = createStructuredSelector({
  list: makeSelectList()
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      addToList
    },
    dispatch
  );

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);

const withReducer = injectReducer({ key: "list", reducer });

export default compose(
  withStyles(styles, {
    name: "AddTranslation"
  }),
  withConnect,
  withReducer,
  memo
)(SimpleModal);
