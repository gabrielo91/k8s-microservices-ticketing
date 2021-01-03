import { useForm } from 'react-hook-form';
import useRequest from '../../hooks/useRequest';

function NewTicket() {
  const { register, handleSubmit, setValue, errors, getValues } = useForm();
  const { doRequest, success } = useRequest({});

  const onSubmit = (data) => {
    console.log(data);
    const result = doRequest({ url: '/api/tickets', method: 'POST', data });
  };

  const onBlur = () => {
    const currentValue = getValues('price');
    const newValue = parseFloat(currentValue);
    if (isNaN(newValue)) {
      return;
    }

    setValue('price', newValue.toFixed(2));
  };

  return (
    <div>
      <h1>Create a new ticket</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-group">
          <label>Title</label>
          <input className="form-control" name="title" ref={register} />
        </div>
        <div className="form-group">
          <label>Price</label>
          <input
            className="form-control"
            name="price"
            onBlur={onBlur}
            ref={register}
            onBlur={onBlur}
          />
        </div>
        <button className="btn btn-primary" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
}

export default NewTicket;
