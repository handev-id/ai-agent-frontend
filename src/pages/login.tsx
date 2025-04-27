import Button from "../components/button/Button";

const Login = () => {
  return (
    <div className="bg-neutral dark:bg-Dark overflow-y-auto h-screen px-4 py-16">
      <div className="w-full lg:w-[550px] m-auto p-6 rounded-lg shadow-lg bg-white dark:bg-neutralDark">
        <Button type="submit" sizing="fullBase" className="my-4">
          Login
        </Button>
      </div>
    </div>
  );
};

export default Login;
