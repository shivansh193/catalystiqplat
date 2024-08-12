import {
    BookOpenIcon,
    ChevronRightIcon,
    MessagesSquareIcon,
    ThumbsUpIcon,
  } from "lucide-react";
  
export const Desc1 = () => {
    return (
      <>
        {/* Icon Blocks */}
        <div className=" relative z-10 container py-24 lg:py-32">
          {/* Grid */}
          <div className="grid md:grid-cols-2 gap-12">
            <div className="lg:w-3/4">
              <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0">
                Personalised solutions for your business, from design to execution.
              </h2>
              <p className="mt-3 text-muted-foreground">
                We help businesses bring ideas to life, by
                designing, implementing and executing the the vision you have for your projects.
              </p>
              <p className="mt-5">
                <a
                  className="inline-flex items-center gap-x-1 group font-medium hover:underline underline-offset-4 "
                  href="#"
                >
                  Contact us
                  <ChevronRightIcon className="flex-shrink-0 w-4 h-4 transition ease-in-out group-hover:translate-x-1" />
                </a>
              </p>
            </div>
            {/* End Col */}
            <div className="space-y-6 lg:space-y-10">
              {/* Icon Block */}
              <div className="flex">
                {/* Icon */}
                <span className="flex-shrink-0 inline-flex justify-center items-center w-[46px] h-[46px] rounded-full border bg-primary text-primary-foreground">
                  <BookOpenIcon className="flex-shrink-0 w-5 h-5" />
                </span>
                <div className="ms-5 sm:ms-8">
                  <h3 className="text-base sm:text-lg font-semibold">
                    daal do content idhar pls
                  </h3>
                  <p className="mt-1 text-muted-foreground">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed eu blandit metus, ut facilisis quam. Donec in lacus et risus viverra ornare. Nunc in neque nec ipsum dignissim volutpat id in mauris. Pellentesque feugiat laoreet tellus. 
                  </p>
                </div>
              </div>
              {/* End Icon Block */}
              {/* Icon Block */}
              <div className="flex">
                {/* Icon */}
                <span className="flex-shrink-0 inline-flex justify-center items-center w-[46px] h-[46px] rounded-full border  bg-primary text-primary-foreground">
                  <MessagesSquareIcon className="flex-shrink-0 w-5 h-5" />
                </span>
                <div className="ms-5 sm:ms-8">
                  <h3 className="text-base sm:text-lg font-semibold">
                    hahahahahahhaha
                  </h3>
                  <p className="mt-1 text-muted-foreground">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed eu blandit metus, ut facilisis quam. Donec in lacus et risus viverra ornare. Nunc in neque nec ipsum dignissim volutpat id in mauris. Pellentesque feugiat laoreet tellus.  
                  </p>
                </div>
              </div>
              {/* End Icon Block */}
              {/* Icon Block */}
              <div className="flex">
                {/* Icon */}
                <span className="flex-shrink-0 inline-flex justify-center items-center w-[46px] h-[46px] rounded-full border bg-primary text-primary-foreground">
                  <ThumbsUpIcon className="flex-shrink-0 w-5 h-5" />
                </span>
                <div className="ms-5 sm:ms-8">
                  <h3 className="text-base sm:text-lg font-semibold">
                    Simple and affordable
                  </h3>
                  <p className="mt-1 text-muted-foreground">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed eu blandit metus, ut facilisis quam. Donec in lacus et risus viverra ornare. Nunc in neque nec ipsum dignissim volutpat id in mauris. Pellentesque feugiat laoreet tellus.  
                  </p>
                </div>
              </div>
              {/* End Icon Block */}
            </div>
            {/* End Col */}

          </div>
          {/* End Grid */}
        </div>
        {/* End Icon Blocks */}
      </>
    );
  }
  
