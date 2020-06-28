import React from "react";
import { render } from "react-testing-library";
import { IntlProvider } from "react-intl";

import List from "../index";

describe("<TestList />", () => {
  it("should render and match the snapshot", () => {
    const {
      container: { firstChild }
    } = render(
      <IntlProvider locale="en">
        <TestList />
      </IntlProvider>
    );
    expect(firstChild).toMatchSnapshot();
  });
});
