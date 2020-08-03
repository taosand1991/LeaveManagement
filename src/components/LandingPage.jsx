import React, {Fragment} from 'react';
import {Timeline, Tween, SplitWords} from 'react-gsap'

const LandingPage = () => {
    return (
        <Fragment>
            <section className='landing-page'>
                <div className='split'>
                    <h4><u>What we do?</u></h4>
                    <Tween from={{opacity: 0, transform: 'scale(2)'}} delay={1} stagger={0.1}
                           ease='elatic.out(0.1, 0.1)'>
                        <SplitWords wrapper={<div style={{display: 'inline-block'}}/>}>
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Commodi doloremque ea earum fugiat
                            hic
                            qui, temporibus veritatis. Dignissimos ducimus excepturi, exercitationem fuga molestiae nemo
                            odio porro repudiandae rerum. Commodi dolorum maiores recusandae vel? Accusamus autem
                            blanditiis
                            cum, eius eum expedita hic illo modi nihil nostrum quaerat qui rerum voluptatem. Aliquam
                            amet
                            consectetur corporis cum distinctio eius eos fugit, id magni maxime nobis obcaecati placeat,
                            quas, quisquam quo reiciendis repellendus veniam! Adipisci consequuntur dicta in magni
                            mollitia
                            nostrum omnis qui ut voluptates. Aliquam aliquid debitis ducimus eligendi illo, inventore
                            itaque
                            maiores neque nesciunt optio ratione rerum sunt voluptate. Aut, iusto nesciunt.
                        </SplitWords>
                    </Tween>
                </div>
                <div className="imageBox">
                    <Timeline target={
                        <Fragment>
                            <img src="/static/image/testimonials-bg.jpg" alt="testimonial"/>
                            <p>
                                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab aliquid aperiam aspernatur
                                consequatur ea est eveniet facere fugiat illum iste itaque iusto magnam minus molestias,
                                obcaecati officiis quaerat quam quasi qui quis reprehenderit sequi soluta tempora,
                                temporibus tenetur, unde veniam. Alias at dolorem esse harum iure labore placeat porro,
                                vero!
                            </p>
                        </Fragment>
                    }>
                        <Tween from={{opacity: 0, y: '200px'}} delay={11}/>
                    </Timeline>
                </div>
                <div className='vision'>
                    <Timeline target={
                        <Fragment>
                            <h2><u>Our vision</u></h2>
                            <p>
                                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci aut cum eaque eos
                                laborum minus nam non numquam, omnis provident repellat repellendus reprehenderit rerum
                                saepe, soluta suscipit ut veritatis voluptates. Ab, architecto cum cupiditate dolorem
                                doloribus earum maiores modi molestiae mollitia, nihil numquam officiis optio quia, quo
                                ratione recusandae repudiandae saepe sequi vero voluptatum. Aliquid autem blanditiis,
                                delectus doloremque eum nostrum quasi repellendus repudiandae voluptas voluptatum! Ea
                                laudantium optio quos sint! Architecto doloribus ipsam velit.
                            </p>
                        </Fragment>
                    }>
                    <Tween from={{opacity:0}} stagger={0.2} delay={12}/>
                    </Timeline>
                </div>
            </section>
        </Fragment>
    );
};

export default LandingPage;