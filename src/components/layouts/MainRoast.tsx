export default function MainRoast() {
  return (
    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-6xl max-w-full h-full">
      <div className="flex flex-col items-center justify-center h-full">
        <div className="urls-input-wrapper">
          <h1 className="text-[64px] mb-6 leading-none font-normal text-[#d70654] text-center text-shadow-xl text-shadow ">
            Roast Me!
          </h1>
          <form action="" className="grid grid-cols-5 gap-6">
            <label
              htmlFor=""
              className="col-span-3 py-1 px-6  bg-[#B8D576] box-shadow"
            >
              Instagram Url
            </label>
            <button className="button-submit col-span-2 py-1 px-6 text-[#d70654] underline underline-offset-2 bg-[#B8D576] box-shadow">
              GOW!
            </button>
            <textarea
              id="url"
              name="url"
              className="col-span-5 py-3 px-6 bg-[#d9d9d9] box-shadow"
              placeholder="Enter Instagram URL"
              required
            />
          </form>
        </div>
      </div>
    </div>
  );
}
