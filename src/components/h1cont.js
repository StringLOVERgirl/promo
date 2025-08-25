export function H1cont({ textRef }) {

    return (
        <div className="h1cont" ref={textRef}>

            <span class="ball"></span>
            <span class="ball"></span>
            <span class="ball"></span>
            <span class="ball"></span>
            <span class="ball"></span>
            <span class="ball"></span>


            <div className="decor_snow_outter">

                <div className="decor_snow_inner">
                    <div className="decor_snow"></div>
                </div>

            </div>


            <div className="top_line_inspired">
                {/* нужно для микс бленд контейнер и псевдоэлемент с фоном а нимаицей ховер */}
                <div className='inspiredcont'>
                    <h2 className='links_text inspired'>inspired by</h2>
                </div>
                
                <div className='logo' role="img" aria-label="лого локомотив"></div>
                
            </div>

            <div className="lokomotive_cont">
                <h2 className='links_text locomotive'>Locomotive</h2>
            </div>


            <div className="description_cont">

                <div className="description des_top_cont">
                    <span>Digital Design Agency</span>
                </div>

                <div className="description des_bottom_cont">
                    <a href="https://locomotive.ca/en" target="_blank">Canada - Montréal</a>
                </div>

                <div className="w_cont">
                    <a className="w_link" target="_blank" href="https://www.awwwards.com/locomotive/">
                        <svg className="awwwards" viewBox="0 0 30 16">
                            <path d="m18.4 0-2.803 10.855L12.951 0H9.34L6.693 
                          10.855 3.892 0H0l5.012 15.812h3.425l2.708-10.228 2.709 
                          10.228h3.425L22.29 0h-3.892ZM24.77 13.365c0 1.506 1.12 
                          2.635 2.615 2.635C28.879 16 30 14.87 30 
                          13.365c0-1.506-1.12-2.636-2.615-2.636s-2.615 1.13-2.615 2.636Z">
                            </path>
                        </svg>
                    </a>
                </div>

                {/* end of desxription cont */}
            </div>


            {/* end of h1 cont */}
        </div>
    )
}