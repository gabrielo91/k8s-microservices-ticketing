import react, { useState } from "react";
import axios from "axios";

export default ({ url, method, body }) => {
  const [errors, setErrors] = useState(null);

  const doRequest = async () => {
    try {
      setErrors(null);
      const options = {
        method,
        data: body,
        url,
      };
      const response = await axios(options);
      return response.data;
    } catch (error) {
      setErrors(
        error.response.data.errors.length > 0 && (
          <div className="alert alert-danger">
            <h4>Ooops</h4>
            <ul className="my-0">
              {error.response.data.errors.map((error) => (
                <li key={error.message}>{error.message}</li>
              ))}
            </ul>
          </div>
        )
      );
    }
  };

  return { errors, doRequest };
};
