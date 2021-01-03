import { useForm } from 'react-hook-form';

function NewTicket() {
  const { register, handleSubmit, watch, errors } = useForm();
  const onSubmit = (data) => console.log(data);

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
          <input className="form-control" name="price" ref={register} />
        </div>
        <button className="btn btn-primary" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
}

export default NewTicket;
