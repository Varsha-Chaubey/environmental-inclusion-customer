import React, { Component } from "react";

class NextButton extends Component {
  state = {};
  render() {
    return (
      <button
        onClick={!this.props.loading ? this.props.handleSubmit : null}
        class={
          this.props.loading
            ? this.props.page==="signup"?"btn btn-default btn-xl btn-lg"
            :this.props.page==="edit-feed"?"btn btn-default btn-xl btn-md"
            :"btn btn-default disabled btn-loading btn-block"
            : this.props.classData
            ? this.props.classData
            : "btn btn-default btn-xl text-capitalize fw-semibold btn-block"
        }
        disabled={this.props.disabled}
      >
        {this.props.loading
          ? "Loading..."
          : this.props.label
          ? this.props.label
          : "Next"}
      </button>
    );
  }
}

export default NextButton;
