
interface Props {
  errors: any;
}

const ValidationErrors = ({ errors }: Props) => {
  return (
    <div className="text-red-500 text-sm mt-1 error" id="error">
      {Array.isArray(errors) ? (
        <ul>
          {errors.map((err: any, i: any) => (
            <li className="list-disc" key={i}>
              {err.message || err}
            </li>
          ))}
        </ul>
      ) : (
        <span>{errors.message || errors}</span>
      )}
    </div>
  );
};

export default ValidationErrors