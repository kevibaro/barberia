
import { useState } from "react";
import { supabase } from '../supabaseClient';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import photo1 from '../assets/photo1.png'
import '../pages/Supabase.css'
import photo2 from '../assets/photo2.png'
import photo3 from '../assets/photo3.png'


function Supabase({ userName }) {
  const [step, setStep] = useState(1);
  const [servicio, setServicio] = useState("");
  const [fecha, setFecha] = useState(null);
  const [hora, setHora] = useState("");
  const [mensaje, setMensaje] = useState("");

  const horasDisponibles = ["09:00", "09:30", "10:00", "10:30", "14:00", "14:30", "17:00", "18:00"];

  const guardarCita = () => {
    supabase
      .from("Barberia")
      .insert([
        {
          servicio,
          fecha: fecha.toISOString().split("T")[0],
          hora,
          usuarios: userName
        },
      ])
      .then(({ error }) => {
        if (error) {
          setMensaje("Error al guardar. Intenta con otra hora.");
        } else {
          setMensaje("¡Cita guardada exitosamente!");
          setStep(1);
          setServicio("");
          setFecha(null);
          setHora("");
        }
      });
  };

  return (
    <div style={{ padding: "40px", fontFamily: "sans-serif" }}>


      {step === 1 && (
        <div className="service">
          <h2 className="titulo">SPESIALISTS</h2>
          <hr className="linea" />

          <div className="botones-servicio">
            <div className="manicura">
              <div className="buttomManicura">
                <h3>Manicura</h3>
                <h4>Anna Leonchart</h4>
                <button
                  className={servicio === 'Manicura' ? 'activo' : ''}
                  onClick={() => setServicio('Manicura')}
                >
                  From $20
                </button>
              </div>
              <img src={photo1} alt="" />
            </div>
            <div className="pedicura">
              <img src={photo3} alt="" />
              <div className="buttomPedicura" >
                <h3>Pedicura</h3>
                <h4>Eren Akerman</h4>
                <button
                  className={servicio === 'Pedicura' ? 'activo' : ''}
                  onClick={() => setServicio('Pedicura')}
                >
                  From $50
                </button>
              </div>
            </div>


            <div className="depilacion">
              <div className="buttomDepilacion">
                <h3>Depilación</h3>
                <h4>Mia Lissa</h4>
                <button
                  className={servicio === 'Depilación' ? 'activo' : ''}
                  onClick={() => setServicio('Depilación')}
                >
                  From $20
                </button>
              </div>
              <img src={photo2} alt="" />
            </div>
          </div>

          <br />
          <button disabled={!servicio} onClick={() => setStep(2)}>
            Siguiente
          </button>
        </div>
      )}
      <>
        {step === 2 && (
          <div className="day">
            <h2 className="titulo">CHOOSE A DATE</h2>
            <br />
            <hr className="linea" />
            <DatePicker
              selected={fecha}
              onChange={date => setFecha(date)}
              inline
            />
            <br />
            <hr />
            <div className="hour">
              {horasDisponibles.map(h => (
                <button className={hora === h ? 'activo' : ''} key={h} onClick={() => setHora(h)}>{h}
                </button>
              ))}
              <br /><br />
            </div>
            <button className='guardado' disabled={!hora} onClick={guardarCita}>
              Guardar cita
            </button>
          </div>
        )}

        {mensaje && <p style={{ marginTop: "20px" }}>{mensaje}</p>}
      </>



    </div>

  );
}

export default Supabase;