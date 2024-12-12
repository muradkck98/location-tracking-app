import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { Polygon } from 'geojson';

@Entity()
export class Area {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'geometry', spatialFeatureType: 'Polygon', srid: 4326 })
  geom: Polygon;

  @Column()
  name: string;
}