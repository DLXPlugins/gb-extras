/**
 * Outline icon component for outline toggle command.
 *
 * @param {Object} props - Component props.
 * @return {JSX.Element} The OutlineIcon component.
 */
const OutlineIcon = ( props ) => {
	return (
		<svg
			viewBox="0 0 14 14"
			xmlns="http://www.w3.org/2000/svg"
			width={ 14 }
			height={ 14 }
			fill="none"
			{ ...props }
		>
			<clipPath id="a">
				<path d="M0 0h14v14H0z" fill="currentColor" />
			</clipPath>
			<g
				fill="currentColor"
				fillRule="evenodd"
				clipPath="url(#a)"
				clipRule="evenodd"
			>
				<path d="M7 5a.5.5 0 0 1 .5.5v3a.5.5 0 0 1-1 0v-3A.5.5 0 0 1 7 5z" />
				<path d="M5 7a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 0 1h-3A.5.5 0 0 1 5 7zM11 7a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 0 1h-2A.5.5 0 0 1 11 7zM0 7a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 0 1h-2A.5.5 0 0 1 0 7z" />
				<path d="M1.5 1a.5.5 0 0 0-.5.5v11a.5.5 0 0 0 .5.5h11a.5.5 0 0 0 .5-.5v-11a.5.5 0 0 0-.5-.5zM0 1.5A1.5 1.5 0 0 1 1.5 0h11A1.5 1.5 0 0 1 14 1.5v11a1.5 1.5 0 0 1-1.5 1.5h-11A1.5 1.5 0 0 1 0 12.5z" />
				<path d="M7 0a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 7 0zM7 11a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 7 11z" />
			</g>
		</svg>
	);
};

export default OutlineIcon;

