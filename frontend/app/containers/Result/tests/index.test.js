import React from "react";
import { render } from "react-testing-library";
import { IntlProvider } from "react-intl";

import List from "../index";

describe("<Result />", () => {
  it("should render and match the snapshot", () => {
    const {
      container: { firstChild }
    } = render(
      <IntlProvider locale="en">
        <Result />
      </IntlProvider>
    );
    expect(firstChild).toMatchSnapshot();
  });
});
