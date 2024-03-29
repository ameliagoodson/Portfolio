import "./about.scss";
import "../../global.scss";
import { Link } from "react-router-dom";
import photo1 from "../../assets/Amelia-Goodson-Web-Developer-Designer-Engineer-Square.jpg";
import photo2 from "../../assets/Amelia-Goodson-Web-Developer-Designer-Engineer-02.jpg";

export default function About() {
	return (
		<div className="about">
			<div className="about-container">
				<h1 id="about" className="page-heading">
					ABOUT
				</h1>
				<h2 className="page-subheading">
					The Short Version
				</h2>
				<p>
					Toronto-based web developer with four years' experience with HTML, CSS, JavaScript and CMSs including WordPress, Joomla!, Silverstripe.
					Full stack developer with one year's experience in
					LAMP stack (Linux, Apache, MySQL and PHP).
				</p>
				<h2 className="page-subheading">
					The Long Version
				</h2>
				<p>
					I pursued a degree in law in Sydney then London without much
					heart until I discovered tech law. In non-lawyer
					speak, I researched who could be held responsible
					for injuries caused by artificial intelligence
					(AI). Who pays when someone dies due to a
					self-driving car malfunction, or robot-assisted
					surgery? I've always been fascinated by the future
					and as I wrote my Honours thesis, I found myself
					thinking about a career in technology.{" "}
				</p>
				<figure>
					<img
						src={photo1}
						alt="Amelia Goodson, blonde woman, sits at desk with laptop open showing coding on the screen"
						className="photo-square"
					></img>
					<figcaption>
						I look less like a stock photo in person (worse
						posture)
					</figcaption>
				</figure>
				<p>
					When I moved back to Australia, I finished my law degree and started working in the Marketing and Communications team for the government, managing their website. And, before the ink was fresh on the law
					transcript, I enrolled in a Full Stack
					Development Boot Camp through the University of Sydney to enhance my skills. Sure, making websites is a
					far cry from robots and Teslas, but the fit was
					right. I learned web development on the job using WordPress and SilverStripe CMSs and learned the theory at the Boot Camp. The Boot Camp was 30+ hours a week on top
					of working full time. It was intense and awesome.
					I cried several times. I often pictured myself as
					a monkey tapping away at my laptop uselessly,
					uncomprehendingly. But I was addicted to learning,
					and the pride I felt when I discovered a fix to a
					problem was unbeatable. I'm a life long student, though, and my 'to
					learn' list would probably make your eyes water.
				</p>
				<figure>
					<img
						src={photo2}
						alt="Blonde woman sits at desk with laptop staring out the window"
						className="photo-square"
					></img>
					<figcaption>
						I fixed that one thing but now two other things
						are broken
					</figcaption>
				</figure>
				<p>
					In my spare time when I'm not designing, coding,
					or wondering why my code doesn't work, I like to
					garden, game, and cook extravagant meals that take
					five hours to make and five minutes to eat.
					Travelling is my greatest joy. It gifts me with
					gratitude, humility, and a glimpse of insight into
					cultures different to my own.
				</p>{" "}
				<p>
					{" "}
					Now I'm in Toronto and I'm pursuing job opportunities in development so
					if you're looking to hire, you can get in touch{" "}
					<Link to="/contact" className="highlight">
						here
					</Link>{" "}
					or check out my{" "}
					<a
						href="https://www.linkedin.com/in/ameliagoodson/"
						className="highlight"
					>
						LinkedIn
					</a>
					.
				</p>
			</div>
		</div>
	);
}
