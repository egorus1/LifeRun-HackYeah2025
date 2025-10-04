import {Quiz} from "@/components/Quiz.tsx";
import bg from "@/shared/assets/bg.png";

export const QuizPage = () => {
    return (
        <div className="flex justify-center items-center h-screen bg-cover bg-center bg-no-repeat" style={{backgroundImage: `url(${bg})`}}>
            <Quiz/>
        </div>
    )
}