import React, { memo } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { compose, bindActionCreators } from "redux";
import injectReducer from "utils/injectReducer";
import { createStructuredSelector } from "reselect";
import { makeSelectList } from "./selectors";
import { addToList } from "./actions";
import VocabTable from "./vocabTable";
import SimpleModal from "./modal";
import Header from "../../components/Header";
import axios from "axios";
import reducer from "./reducer";
import { BASE_URL } from "../App/constants";

// eslint-disable-next-line react/prefer-stateless-function
class List extends React.Component {
  componentWillMount() {
    axios.get(`${BASE_URL}/api/v1/translations`).then(response => {
      const translationsList = response.data.data;
      this.props.addToList(translationsList);
    });
  }
  render() {
    return (
      <div>
        <h1>
          <Header />
          <VocabTable />
        </h1>
        <SimpleModal />
      </div>
    );
  }
}
SimpleModal.protoTypes = {
  addToListCall: PropTypes.func
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
  withConnect,
  withReducer,
  memo
)(List);
