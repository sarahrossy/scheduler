import React from "react";
import { render, cleanup } from "@testing-library/react";
import Form from "components/Appointment/Form";
import { fireEvent } from "@testing-library/react/dist";

afterEach(cleanup);

describe("Form", () => {
  const interviewers = [
    {
      id: 1,
      name: "Sylvia Palmer",
      avatar: "https://i.imgur.com/LpaY82x.png"
    }
  ];

  it("renders without crashing", () => {
    render(<Form interviewers={interviewers}/>);
  })


  it("renders without student name if not provided", () => {
    const { getByPlaceholderText } = render(
      <Form interviewers={interviewers} />
    );
    expect(getByPlaceholderText("Enter Student Name")).toHaveValue("");
  });
  

  it("renders with initial student name", () => {
    const { getByTestId } = render(
      <Form interviewers={interviewers} name="Lydia Miller-Jones" />
    );
    expect(getByTestId("student-name-input")).toHaveValue("Lydia Miller-Jones");
  });


  it("validates that the student name is not blank", () => {
    // simulates what function we are tracking
    const onSave = jest.fn();

    // renders the component we are testing, with appropriate props
    const { getByText } = render(
      <Form interviewers={interviewers} />
    )
    
    // event tracking - we are getting the Save button by text
    fireEvent.click(getByText("Save"))

    // comparing results to expected values
    expect(getByText(/student name cannot be blank/i)).toBeInTheDocument();
    expect(onSave).not.toHaveBeenCalled();
  });
  
  it("can successfully save after trying to submit an empty student name", () => {
    const onSave = jest.fn();
    const { getByText, getByPlaceholderText, queryByText } = render(
      <Form interviewers={interviewers} onSave={onSave} />
    );
  
    fireEvent.click(getByText("Save"));
  
    expect(getByText(/student name cannot be blank/i)).toBeInTheDocument();
    expect(onSave).not.toHaveBeenCalled();
  
    fireEvent.change(getByPlaceholderText("Enter Student Name"), {
      target: { value: "Lydia Miller-Jones" }
    });
  
    fireEvent.click(getByText("Save"));
  
    expect(queryByText(/student name cannot be blank/i)).toBeNull();
  
    expect(onSave).toHaveBeenCalledTimes(1);
    expect(onSave).toHaveBeenCalledWith("Lydia Miller-Jones", null);
  });

  it("calls onCancel and resets the input field", () => {
    // mock function to be passed; simulates what function we are tracking
    // https://testing-library.com/docs/queries/about
    const onCancel = jest.fn();

    // 2. render the component, destructuring the render methods we need and passing the props we need
    const { getByText, getByPlaceholderText, queryByText } = render(
      <Form
        interviewers={interviewers}
        name="Lydia Mill-Jones"
        onSave={jest.fn()}
        onCancel={onCancel}
      />
    );

    // 3. fire the event to create the result
    fireEvent.click(getByText("Save"));
    fireEvent.change(getByPlaceholderText("Enter Student Name"), {
      target: { value: "Lydia Miller-Jones" }
    });

    // 1. write your expect statements
    // testing results - all need to pass for the it() test to pass
    expect(queryByText(/student name cannot be blank/i)).toBeNull();
    expect(getByPlaceholderText("Enter Student Name")).toHaveValue("");
    expect(onCancel).toHaveBeenCalledTimes(1);
  })
  // it("calls onSave function when the name is defined", () => {
    // mock function to be passed.
    // simulates what function we are tracking
    // https://testing-library.com/docs/queries/about
  //   const onSave = jest.fn();

  //   // renders the component, destructuring the render methods we need and passing the props we need
  //   const { getByText, queryByText } = render(
  //     <Form onSave={onSave} interviewers={interviewers} name="Lydia Miller-Jones"/>
  //   )

  //   // firing the actual event
  //   fireEvent.click(getByText("Save"));
        
  //   // testing results - all 3 need to pass for the it() test to pass
  //   expect(queryByText(/student name cannot be blank/i)).toBeNull();
  //   expect(onSave).toHaveBeenCalledTimes(1);
  //   expect(onSave).toHaveBeenCalledWith("Lydia Miller-Jones", null);
  // });

  // it("submits the name entered by the user", () => {
  //   const onSave = jest.fn();
  //   const { getByText, getByPlaceholderText } = render(
  //     <Form interviewers={interviewers} onSave={onSave} />
  //   )

  //   // 2.
  //   const input = getByPlaceholderText("Enter Student Name");

  //   // 3. firing the event to create the result
  //   fireEvent.change(input, { target: { value: "Lydia Miller-Jones" } });
  //   fireEvent.click(getByText("Save"));

  //   // 1. write your expect statements
  //   expect(onSave).toHaveBeenCalledTimes(1);
  //   expect(onSave).toHaveBeenCalledWith("Lydia Miller-Jones", null)
  // })

});