import _ from "lodash";
const Question = (props) => {
  const { data, index } = props;
  if (_.isEmpty(data)) {
    return <></>;
  }
  const handleChecked = (e, answerId, questionId) => {
    props.handleCheckBox(answerId, questionId);
  };
  return (
    <>
      {data && data.image ? (
        <div className="q-body">
          <img src={`data:image/jpeg;base64, ${data.image}`} alt="" />
        </div>
      ) : (
        <div className="q-image"></div>
      )}
      <div className="question">
        {`Question ${index + 1}: `}
        {data && data.questionDescription ? data.questionDescription : ""}
      </div>
      <div className="answer">
        {props && props.data ? (
          props.data.answers.map((a, index) => {
            return (
              <div key={`a-${index}`} className="a-child">
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    value=""
                    checked={a.isChecked}
                    onChange={(e) => {
                      handleChecked(e, a.id, data.questionId);
                    }}
                  />
                  <label className="form-check-label">
                    {`   ${a.description}`}
                  </label>
                </div>
              </div>
            );
          })
        ) : (
          <></>
        )}
      </div>
    </>
  );
};
export default Question;
