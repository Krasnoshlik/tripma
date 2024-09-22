import { PassengerStateType,FlightStateTypes } from "../store/types";

export default function GenerateTicketPng(passenger: PassengerStateType, flight: FlightStateTypes) {
  const canvas = document.createElement('canvas');
  canvas.width = 800;
  canvas.height = 500;
  const ctx = canvas.getContext('2d');

  if (ctx) {
      ctx.fillStyle = '#f3f4f6';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = '#ffffff';
      ctx.fillRect(20, 20, canvas.width - 40, canvas.height - 40);

      ctx.strokeStyle = '#000';
      ctx.lineWidth = 2;
      ctx.strokeRect(20, 20, canvas.width - 40, canvas.height - 40);

      ctx.fillStyle = '#000000';
      ctx.font = 'bold 24px Arial';
      ctx.fillText('Flight Ticket', 30, 50);

      ctx.beginPath();
      ctx.moveTo(20, 70);
      ctx.lineTo(canvas.width - 20, 70);
      ctx.stroke();

      ctx.font = '16px Arial';
      ctx.fillText('Passenger Information:', 30, 100);
      ctx.fillText(`Name: ${passenger.pFirstName} ${passenger.pMiddleName} ${passenger.pLastName}`, 30, 130);
      ctx.fillText(`Birthdate: ${passenger.birthDate}`, 30, 160);
      ctx.fillText(`Email: ${passenger.pEmail}`, 30, 190);
      ctx.fillText(`Phone: +${passenger.pPhone}`, 30, 220);

      ctx.fillText('Flight Information:', 30, 300);
      ctx.fillText(`From: ${flight.FromWhereFlight}`, 30, 330);
      ctx.fillText(`To: ${flight.ToWhereFlight}`, 30, 360);
      ctx.fillText(`Date: ${new Date(flight.DateFlight).toLocaleDateString()}`, 30, 390);
      ctx.fillText(`Persons: ${flight.PersonsFlight}`, 30, 410);

      ctx.beginPath();
      ctx.moveTo(20, 260);
      ctx.lineTo(canvas.width - 20, 260);
      ctx.stroke();

      ctx.fillStyle = '#000000';
      for (let i = 0; i < 30; i++) {
          ctx.fillRect(600 + i * 6, 320, 2, 60);
      }

      canvas.toBlob((blob) => {
          if (blob) {
              const url = URL.createObjectURL(blob);
              const link = document.createElement('a');
              link.href = url;
              link.download = 'airplane_ticket.png';
              link.click();
          }
      });
  }
}

