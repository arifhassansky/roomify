import Swal from "sweetalert2";
import emailjs from "@emailjs/browser";

const MailBox = () => {
  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        "service_y6gnqrj",
        "template_7uizrws",
        form.current,
        "H-t7KaPvHV_1LxB21"
      )
      .then(() => {
        form.current.reset();
        Swal.fire({
          position: "top-center",
          icon: "success",
          title: "Your message has been submitted",
          showConfirmButton: false,
          timer: 1500,
        });
      });
  };

  return (
    <div className="w-9/12 mx-auto">
      <h1 className="text-center text-3xl font-medium pb-10">Send Message</h1>
      <div
        id="contact"
        className="shadow-xl px-6 md:px-10 py-6 border-2 rounded-2xl border-primary relative mx-auto container"
      >
        <div className="grid lg:grid-cols-12 items-center gap-16">
          <div className="lg:col-span-6 place-items-center md:place-items-start">
            <img
              className=" rounded-2xl"
              src="https://i.ibb.co/McqLNL3/gif.gif"
              alt=""
            />
          </div>

          {/* right div  */}
          <div className="lg:col-span-6 ">
            <form onSubmit={sendEmail} className="mx-auto">
              <div className="mb-4">
                <label htmlFor="name" className="block mb-2 font-medium ">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="user_name"
                  className="block w-full px-4 py-2 border border-primary rounded-lg  focus:outline-none"
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="email" className="block mb-2 font-medium ">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="user_email"
                  className="block w-full px-4 py-2 border border-primary rounded-lg  focus:outline-none"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block mb-2 font-medium">Message</label>
                <textarea
                  rows={4}
                  className="block w-full px-4 py-2 border border-primary focus:outline-none rounded-lg "
                  required
                />
              </div>
              <div className="text-center">
                <button
                  type="submit"
                  className="bg-primary btn text-white hover:bg-secondary hover:text-black px-4 py-2 mr-6"
                >
                  Send Message
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MailBox;
