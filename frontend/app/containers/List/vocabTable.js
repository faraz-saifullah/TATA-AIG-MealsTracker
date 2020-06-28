import React, { memo } from "react";
import MaterialTable from "material-table";
import { compose, bindActionCreators } from "redux";
import { createStructuredSelector } from "reselect";
import injectReducer from "utils/injectReducer";
import { connect } from "react-redux";
import { deleteFromList } from "./actions";
import axios from "axios";
import { makeSelectList } from "./selectors";
import reducer from "./reducer";
import { BASE_URL } from "../App/constants";

class VocabTable extends React.Component {
  async delFromList(oldData) {
    // eslint-disable-next-line react/prop-types
    const { list } = this.props;
    let vocabList = list;
    let id = "";
    for (let i = 0; i < vocabList.length; i += 1) {
      if (
        vocabList[i].word == oldData.word &&
        vocabList[i].translation == oldData.translation &&
        vocabList[i].native.name == oldData.native &&
        vocabList[i].foreign.name == oldData.foreign
      ) {
        id = vocabList[i]._id;
        break;
      }
    }
    // await axios.delete(`${BASE_URL}/api/v1/translations/${id}`);
    window.location.reload();
    for (let i = 0; i < list.length; i += 1) {
      if (list[i].key === id) list.splice(i, 1);
      // eslint-disable-next-line react/prop-types
      this.props.deleteFromList(list);
    }
  }

  render() {
    const columns = [
      { title: "From Language", field: "native" },
      { title: "Word", field: "word" },
      { title: "To Language", field: "foreign" },
      {
        title: "Translation",
        field: "translation"
      }
    ];
    const tableRows = [];
    if (typeof this.props.list[0] != "undefined") {
      for (let i = 0; i < this.props.list.length; i += 1) {
        const object = {
          native: this.props.list[i].native.name,
          word: this.props.list[i].word,
          foreign: this.props.list[i].foreign.name,
          translation: this.props.list[i].translation
        };
        tableRows.push(object);
      }
    }
    return (
      <MaterialTable
        title="Vocabulary List"
        columns={columns}
        data={tableRows}
        editable={{
          onRowDelete: oldData =>
            new Promise(resolve => {
              setTimeout(() => {
                resolve();
                this.delFromList(oldData);
              }, 600);
            })
        }}
      />
    );
  }
}

const mapStateToProps = createStructuredSelector({
  list: makeSelectList()
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      deleteFromList
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
)(VocabTable);
