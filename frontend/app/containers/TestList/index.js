import React, { memo } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { compose, bindActionCreators } from "redux";
import { createStructuredSelector } from "reselect";
import injectReducer from "utils/injectReducer";
import MobileStepper from "@material-ui/core/MobileStepper";
import { makeSelectList } from "../List/selectors";
import { makeSelectTest, makeSelectAnswers } from "./selectors";
import { addToTest, finishTest } from "./actions";
import Header from "../../components/Header";
import CenteredSection from "./CenteredSection";
import reducer from "./reducer";
import Form from "./Form";
import HeaderLink from "./HeaderLink";
import axios from "axios";
import Input from "./Input";
import { BASE_URL } from "../App/constants";

class TestList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      index: 0,
      translation: "",
      answers: ["", "", "", "", "", "", "", "", "", ""]
    };
  }

  componentDidMount() {
    this.startTest();
  }

  async startTest() {
    // let tempList = await axios.get(`${BASE_URL}/api/v1/translations/random`);
    tempList = tempList.data.data;
    this.props.addToTest(tempList);
  }

  nextQuestion() {
    const answerList = this.state.answers;
    const current = this.state.index;
    const answer = this.state.translation;

    answerList[current] = answer;
    this.setState({
      answers: answerList,
      index: current + 1 < 10 ? current + 1 : 9,
      translation: ""
    });
  }

  prevQuestion() {
    const answerList = this.state.answers;
    const current = this.state.index;
    const answer = this.state.translation;
    this.setState({
      answers: answerList,
      index: current - 1 > -1 ? current - 1 : 0,
      translation: ""
    });
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  clickStartTest(event) {
    event.persist();
    event.preventDefault();
    this.startTest();
  }

  finishTest() {
    this.nextQuestion();
    this.props.finishTest(this.state.answers);
  }

  render() {
    let data;
    if (typeof this.props.test[0] === "undefined") {
      data = this.props.list;
    } else {
      data = this.props.test;
    }
    return (
      <CenteredSection>
        <h1>
          <Header />
          <Form>
            <MobileStepper
              variant="progress"
              steps={10}
              position="top"
              style={{ width: "200%" }}
              activeStep={this.state.index}
            />
            <p>Question {this.state.index + 1} / 10</p>
            <br />
            <Input
              id="native"
              type="text"
              name="native"
              value={data[this.state.index].native.name}
            />{" "}
            <Input
              id="word"
              type="text"
              name="word"
              value={data[this.state.index].word}
            />
            <br />
            <Input
              id="foreign"
              type="text"
              name="foreign"
              value={data[this.state.index].foreign.name}
            />{" "}
            <Input
              id="translation"
              type="text"
              name="translation"
              placeholder="Translation"
              value={this.state.translation}
              onChange={e => this.handleChange(e)}
            />
            <br />
            <br />
            <HeaderLink id="previous" onClick={() => this.prevQuestion()}>
              Prev
            </HeaderLink>
            <HeaderLink id="next" onClick={() => this.nextQuestion()}>
              Next
            </HeaderLink>
            <HeaderLink
              id="finish"
              onClick={() => this.finishTest()}
              to="/result"
            >
              Finish
            </HeaderLink>
          </Form>
        </h1>
      </CenteredSection>
    );
  }
}

TestList.propTypes = {
  addToTestCall: PropTypes.func,
  finishTestCall: PropTypes.func,
  list: PropTypes.array,
  test: PropTypes.array
};

const mapStateToProps = createStructuredSelector({
  list: makeSelectList(),
  test: makeSelectTest(),
  answers: makeSelectAnswers()
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      addToTest,
      finishTest
    },
    dispatch
  );

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);

const withReducer = injectReducer({ key: "test", reducer });

export default compose(
  withConnect,
  withReducer,
  memo
)(TestList);
